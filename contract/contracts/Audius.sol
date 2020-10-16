pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Owner must be TokenFactory
contract Audius is AudiusInterface, Ownable {
    using SafeMath for uint256;

    event Claim(
        address indexed from,
        address indexed token,
        uint256 amount
    );

    string private followersHash;
    uint256 followersNum;
    mapping(address => bool) private followerClaimed;

    mapping(address => mapping(address => uint256)) private creatorsTokenBalances;
    mapping(address => bool) public registeredTokens;
    mapping(address => address) public tokensCreator;

    // Add Audius list
    function addAudiusList(address creator, address token, string memory _followersHash, uint256 _followersNum) external onlyOwner {
      tokensCreator[token] = creator;
      registeredTokens[token] = true;
      followersHash = _followersHash;
      followersNum = _followersNum;
    }

    // Get the amount of tokens distributed
    function distributedAmount(address token) external view returns (uint256) {
      FanToken fanToken = FanToken(token);
      uint256 balance = fanToken.balanceOf(address(this));
      return balance.div(followersNum);
    }

    // Claim tokens
    function claim(address token) external {
      // TODO Check Chainlink api
      
      FanToken fanToken = FanToken(token);
      fanToken.transfer(msg.sender, distributedAmount());
    }
}
