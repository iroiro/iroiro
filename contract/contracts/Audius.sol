// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "./SafeMath64.sol";
import "./TokenFactory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Owner must be TokenFactory
contract Audius is AudiusInterface, ChainlinkClient, Ownable {
    using SafeMath64 for uint64;

    event Claim(
        address indexed from,
        address indexed token,
        uint256 amount
    );

    TokenFactory tokenFactory;

    uint64 public nextTokenId;
    uint64 public nextUserId;
    mapping(address => uint64) public tokenIdList;
    mapping(address => uint64) public userIdList;
    mapping(address => string) public followersHash;
    mapping(address => uint256) public followersNum;
    mapping(address => mapping(address => bool)) private followerClaimedTokens;
    mapping(bytes32 => bool) private claimKeyHashList;

    constructor(address _factory, address _link) public {
        nextTokenId = 1;
        nextUserId = 1;
        tokenFactory = TokenFactory(_factory);
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
    }

    function generateClaimKey(uint64 userId, uint64 tokenId) public pure returns (uint256){
        return uint256(userId) * (10 ** 21) + uint256(tokenId) * 10 + 1;
        // 1 as true
    }

    function isClaimable(address token) public override view returns (bool) {
        uint64 tokenId = tokenIdList[token];
        require(tokenId > 0, "Token is not registered");
        uint64 userId = userIdList[msg.sender];
        require(userId > 0, "User is not registered");

        uint256 claimKey = generateClaimKey(userId, tokenId);
        bytes32 claimKeyHash = keccak256(abi.encodePacked(claimKey));
        if (claimKeyHashList[claimKeyHash]) {
            return true;
        } else {
            return false;
        }
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
        require(isClaimable(token), "Account is not able to claim");
        // TODO check user already claimed

        followerClaimedTokens[token][msg.sender] = true;
        FanToken fanToken = FanToken(token);
        fanToken.transfer(msg.sender, distributedAmount(token));
    }

    // TODO Consider avoid duplicate value
    function requestCheckingAddress(
        address _oracle,
        bytes32 _jobId,
        string memory userAddress,
        string memory tokenAddress,
        address token,
        uint256 fee
    ) public override returns (bytes32 requestId) {
        uint64 tokenId = tokenIdList[token];
        require(tokenId > 0, "Token is not registered");

        uint64 userId;
        if (userIdList[msg.sender] == 0) {
            userId = nextUserId;
            userIdList[msg.sender] = userId;
            nextUserId = nextUserId.add(1);
        } else {
            userId = userIdList[msg.sender];
        }
        string memory followersHash = followersHash[token];

        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulfill.selector);
        request.add("cid", followersHash);
        request.add("tokenAddress", tokenAddress);
        request.add("userAddress", userAddress);

        return sendChainlinkRequestTo(_oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId) {
        claimKeyHashList[_data] = true;
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

    function addressToStringTest() public view returns(string memory) {
        return string(abi.encodePacked(msg.sender));
    }
}
