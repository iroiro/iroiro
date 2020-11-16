// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./NewInterfaces.sol";
import "contracts/SafeMath64.sol";
import "./SafeMath64.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AudiusFollowersDistributer is DistributerInterface {
    function createCampaign(
        address payable token,
        address tokenSender,
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate,
        string memory baseURL
    ) public override {
        // TODO Update checking tokenSender logic with token issuance phase
        require(msg.sender == tokenSender, "Token holder must match to msg.sender");
        uint256 allowance = getAllowanceOf(token, tokenSender);
        require(allowance > 0, "No token is approved to transfer");
        require(allowance > recipientsNum, "Token amount is not enough to distribute");

        uint256 claimAmount = calculateClaimAmount(allowance, recipientsNum);
        AudiusFollowersCampaign campaign = new AudiusFollowersCampaign(
            token,
            campaignInfoCid,
            recipientsCid,
            claimAmount,
            tokenSender,
            startDate,
            endDate,
            baseURL
        );
        transferToken(token, tokenSender, address(campaign), allowance);

        emit CreateCampaign(
            token,
            recipientsCid,
            recipientsNum,
            startDate,
            endDate
        );
    }
}

contract AudiusFollowersCampaign is CampaignInterface {
    using SafeMath64 for uint64;

    uint64 public nextUserId = 1;
    mapping(address => uint64) userIdList;
    mapping(address => bool) claimedUserList;
    mapping(bytes32 => bool) private claimKeyHashList;

    constructor(
        address payable _token,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate,
        string memory _baseURL
    ) public {
        token = _token;
        campaignInfoCid = _campaignInfoCid;
        recipientsCid = _recipientsCid;
        claimAmount = _claimAmount;
        status = Status.Active;
    }

    function generateClaimKey(uint64 userId) public pure returns (uint256){
        return uint256(userId) * 10 + 1; // 1 as true
    }

    function isClaimable() public view override returns (bool) {
        uint64 userId = userIdList[msg.sender];
        require(userId > 0, "User is not registered");
        if (claimedUserList[msg.sender]) {
            return false;
        }

        return true;
    }

    // TODO Logic could be changed
    function claim() external override {
        require(isClaimable(), "Token is not claimable");
        require(!claimedUserList[msg.sender], "Already claimed");

        claimedUserList[msg.sender] = true;
        ERC20 erc20 = ERC20(token);
        erc20.transfer(refundDestination, claimAmount);

        emit Claim(claimAmount);
    }

    function fulfill(bytes32 _requestId, bytes32 data) public recordChainlinkFulfillment(_requestId) {
        claimKeyHashList[data] = true;
    }

    function requestCheckingIsClaimable(
        address _oracle,
        bytes32 _jobId,
        uint256 fee,
    // TODO Add other arguments for actual request
        string memory userAddress
    ) external returns (bytes32 requestId) {
        uint64 userId;
        if (userIdList[msg.sender] == 0) {
            userId = nextUserId;
            userIdList[msg.sender] = userId;
            nextUserId = nextUserId.add(1);
        } else {
            userId = userIdList[msg.sender];
        }

        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulfill.selector);
        request.add("cid", recipientsCid);
        request.add("userAddress", userAddress);

        return sendChainlinkRequestTo(_oracle, request, fee);
    }
}