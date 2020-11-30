// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../../NewInterfaces.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol";
import "../../SafeMath64.sol";

contract AudiusFollowersDistributor is DistributorInterface {
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
        AudiusFollowersCampaign campaign = new AudiusFollowersCampaign(
            token,
            campaignInfoCid,
            recipientsCid,
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

contract AudiusFollowersCampaign is CampaignInterface {
    using SafeMath64 for uint64;

    uint64 public nextUserId = 1;
    mapping(address => uint64) public userIdList;
    mapping(address => bool) public claimedUserList;
    mapping(bytes32 => bool) private claimKeyHashList;

    // TODO Integrate with parent constructor
    constructor(
        address payable _token,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate,
        address _link
    ) public CampaignInterface(
        _token,
        _campaignInfoCid,
        _recipientsCid,
        _claimAmount,
        _refundDestination,
        _startDate,
        _endDate,
        _link
    ) {}

    function generateClaimKey(uint64 userId) public pure returns (uint256){
        return uint256(userId) * 10 + 1;
        // 1 as true
    }

    function isClaimable(address user) public view override returns (bool) {
        uint64 userId = userIdList[user];
        if (userId == 0) {
            return false;
        }
        if (claimedUserList[user]) {
            return false;
        }
        uint256 claimKey = generateClaimKey(userId);
        bytes32 claimKeyHash = keccak256(abi.encodePacked(claimKey));
        return claimKeyHashList[claimKeyHash];
    }

    function claim() external override mustBeActive inTime {
        require(isClaimable(msg.sender), "Token is not claimable");

        claimedUserList[msg.sender] = true;
        ERC20 erc20 = ERC20(token);
        erc20.transfer(msg.sender, claimAmount);

        emit Claim(msg.sender);
    }

    function fulfill(bytes32 _requestId, bytes32 data) public recordChainlinkFulfillment(_requestId) {
        claimKeyHashList[data] = true;
    }

    function requestCheckingIsClaimable(
        address _oracle,
        bytes32 _jobId,
        uint256 fee,
        string memory userAddress
    ) external returns (bytes32 requestId) {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.allowance(msg.sender, address(this)) >= fee, "allowance is not enough");
        link.transferFrom(msg.sender, address(this), fee);

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