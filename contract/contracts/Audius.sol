// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "./TokenFactory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Owner must be TokenFactory
contract Audius is AudiusInterface {
    using SafeMath for uint256;

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

    constructor(address _factory) public {
        tokenFactory = TokenFactory(_factory);
        nextTokenId = 1;
    }

    function isClaimable(address token) public override view returns(bool) {
        // TODO Integrate with chainlink
        return true;
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

    function requestCheckingAddress(
        address _oracle,
        bytes32 _jobId,
        string memory _cid,
        string memory tokenAddress,
        string memory userAddress,
        address token,
        uint256 fee
    ) public override returns (bytes32 requestId) {
        // tmp value
        return _jobId;
    }
}
