pragma solidity ^0.6.0;

import "./interfaces.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Owner must be TokenFactory
contract StakingPool is PoolInterface, Ownable {
    using SafeMath for uint256;

    mapping(address => bool) public registeredTokens;

    function addTokenToStakingList(address token) public onlyOwner {
        registeredTokens[token] = true;
    }

    function earned(address account, address token) public override view returns(uint256) {
        return 0;
    }

    function stake(uint256 amount, address token) public override {
        require(registeredTokens[token], "Token is not registered to staking list");
    }

    function withdraw(uint256 amount, address token) public override {

    }

    function claim(address token) public override {

    }
}
