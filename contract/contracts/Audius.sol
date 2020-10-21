// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "./TokenFactory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Owner must be TokenFactory
contract Audius is AudiusInterface, ChainlinkClient, Ownable {
    event Claim(
        address indexed from,
        address indexed token,
        uint256 amount
    );

    TokenFactory tokenFactory;

    uint256 public nextTokenId;
    mapping(address => uint256) public tokenIdList;
    mapping(address => string) public followersHash;
    mapping(address => uint256) public followersNum;
    mapping(address => bool) private followerClaimed;
    bool public isIncluded;

    constructor(address _factory, address _link) public {
        nextTokenId = 1;
        tokenFactory = TokenFactory(_factory);
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
    }

    function isClaimable(address token) public override view returns(bool) {
        // TODO Integrate with chainlink
        return true;
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function remainingAmount(address token) public view returns (uint256) {
        FanToken fanToken = FanToken(token);
        return fanToken.balanceOf(address(this));
    }

    // Add Audius list
    function addAudiusList(uint256 id, string memory _followersHash, uint256 _followersNum) external override {
        address token = tokenFactory.creatorTokenOf(msg.sender, id);
        require(tokenIdList[token] == 0, "Token is already registered");

        followersHash[token] = _followersHash;
        followersNum[token] = _followersNum;
        tokenIdList[token] = nextTokenId;
        nextTokenId = nextTokenId.add(1);
    }

    // Get the amount of tokens distributed
    function distributedAmount(address token) public override view returns (uint256) {
        FanToken fanToken = FanToken(token);
        uint256 balance = fanToken.balanceOf(address(this));
        return balance.div(followersNum[token]);
    }

    // Claim tokens
    function claim(address token) external override {
        // TODO Check Chainlink api
        require(isClaimable(token), "Account is not able to claim");

        FanToken fanToken = FanToken(token);
        fanToken.transfer(msg.sender, distributedAmount(token));
    }

    // TODO Update arguments and local variables
    function requestCheckingAddress(
        address _oracle,
        bytes32 _jobId,
        string memory _url,
        string memory _cid,
        string memory _address,
        uint256 fee
    ) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulfill.selector);
        request.add("cid", _cid);
        request.add("address", _address);

        return sendChainlinkRequestTo(_oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bool _data) public recordChainlinkFulfillment(_requestId) {
        isIncluded = _data;
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
    ) public onlyOwner {
        cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
    }
}
