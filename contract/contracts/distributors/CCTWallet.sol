// SPDX-License-Identifier: GPL-3.0
/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol";
import "../interfaces/CampaignInterface.sol";
import "../interfaces/DistributorInterface.sol";
import "../SafeMath64.sol";

contract CCTWalletDistributor is DistributorInterface {
    constructor (string memory _distributorInfoCid, address _link) public
    DistributorInterface(_distributorInfoCid, _link) {}

    function createCampaign(
        address payable token,
        address tokenSender,
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate
    ) public override {
        // TODO Update checking tokenSender logic with token issuance phase
        require(msg.sender == tokenSender, "Token holder must match to msg.sender");
        uint256 allowance = getAllowanceOf(token, tokenSender);
        require(allowance > 0, "No token is approved to transfer");
        require(allowance >= recipientsNum, "Token amount is not enough to distribute");

        uint256 claimAmount = calculateClaimAmount(allowance, recipientsNum);
        CCTWalletCampaign campaign = new CCTWalletCampaign(
            token,
            campaignInfoCid,
            recipientsCid,
            nextCampaignId,
            claimAmount,
            tokenSender,
            startDate,
            endDate,
            link
        );
        transferToken(token, tokenSender, address(campaign), allowance);
        campaignList[nextCampaignId] = address(campaign);
        nextCampaignId = nextCampaignId.add(1);
        campaign.transferOwnership(msg.sender);

        emit CreateCampaign(
            address(campaign),
            token,
            msg.sender
        );
    }
}

contract CCTWalletCampaign is CampaignInterface {
    using SafeMath64 for uint64;

    uint64 public nextUserId = 1;
    mapping(uint64 => address) public userList;
    mapping(address => uint64) public userIdList;
    mapping(address => bool) public claimedUserList;
    mapping(bytes32 => bool) private claimKeyHashList;
    mapping(address => bool) public sentUserList;

    // TODO Integrate with parent constructor
    constructor(
        address payable _token,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _campaignId,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate,
        address _link
    ) public CampaignInterface(
        _token,
        _campaignInfoCid,
        _recipientsCid,
        _campaignId,
        _claimAmount,
        _refundDestination,
        _startDate,
        _endDate,
        _link
    ) {}

    modifier isValidHashAndSignature(
        bytes32 toAddressHash,
        bytes32 r,
        bytes32 s,
        uint8 v,
        address from,
        address to
    ) {
        require(
            toAddressHash == keccak256(abi.encodePacked(to)),
            "toAddressHash and hash of to address are not matched"
        );

        if (v < 27) {
            v += 27;
        }
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedProof = keccak256(abi.encodePacked(prefix, toAddressHash));
        address _from = ecrecover(prefixedProof, v, r, s);
        require(address(0) != _from, "address is 0");
        require(from == _from, "from address is not matched");

        _;
    }

    function generateClaimKey(uint64 userId) public pure returns (uint256){
        return uint256(userId) * 10 + 1;
        // 1 as true
    }

    function isClaimable(address from, address to) public view returns (bool) {
        uint64 userId = userIdList[from];
        if (userId == 0) {
            return false;
        }
        if (claimedUserList[from]) {
            return false;
        }
        if (sentUserList[to]) {
            return false;
        }
        uint256 claimKey = generateClaimKey(userId);
        bytes32 claimKeyHash = keccak256(abi.encodePacked(claimKey));
        return claimKeyHashList[claimKeyHash];
    }

    function claim(
        bytes32 toAddressHash,
        bytes32 r,
        bytes32 s,
        uint8 v,
        address from,
        address to
    )
    external
    mustBeActive
    inTime
    isValidHashAndSignature(toAddressHash, r, s, v, from, to)
    {
        require(isClaimable(from, to), "Token is not claimable");

        claimedUserList[from] = true;
        sentUserList[to] = true;
        ERC20 erc20 = ERC20(token);
        erc20.transfer(to, claimAmount);

        emit Claim(from, to);
    }

    function fulfill(bytes32 _requestId, bytes32 data) public recordChainlinkFulfillment(_requestId) {
        claimKeyHashList[data] = true;
    }

    /**
     * @notice Request to Chainlink whether target address is claimable token
     * Target address usually has no ETH, so another wallet send this function for target address
     */
    function requestCheckingIsClaimable(
        address _oracle,
        bytes32 _jobId,
        address targetAddress
    ) external returns (bytes32 requestId) {
        uint64 userId;
        if (userIdList[targetAddress] == 0) {
            userId = nextUserId;
            userList[userId] = targetAddress;
            userIdList[targetAddress] = userId;
            nextUserId = nextUserId.add(1);
        } else {
            userId = userIdList[targetAddress];
        }

        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulfill.selector);
        request.add("cid", recipientsCid);
        request.addUint("userId", userId);
        request.addUint("campaignId", campaignId);

        return sendChainlinkRequestTo(_oracle, request, 0);
    }

    /**
     * @notice Allows the owner to withdraw any LINK balance on the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    /**
     * @notice Call this method if no response is received within 5 minutes
     * @param _requestId The ID that was generated for the request to cancel
     * @param _payment The payment specified for the request to cancel
     * @param _callbackFunctionId The bytes4 callback function ID specified for
     * the request to cancel
     * @param _expiration The expiration generated for the request to cancel
     */
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    // TODO Consider about onlyOwner for operation cost
    ) public onlyOwner {
        cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
    }
}
