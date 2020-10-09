pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Owner must be TokenFactory
contract StakingPool is PoolInterface, Ownable {
    using SafeMath for uint256;

    mapping(address => mapping(address => uint256)) private creatorsTokenBalances;
    mapping(address => bool) public registeredTokens;

    function balanceOf(address account, address token) public view returns(uint256){
        return creatorsTokenBalances[account][token];
    }

    function addTokenToStakingList(address token) public onlyOwner {
        registeredTokens[token] = true;
    }

    function earned(address account, address token) public override view returns(uint256) {
        return 0;
    }

    function stake(uint256 amount, address token) public override {
        require(registeredTokens[token], "Token is not registered to staking list");
        FanToken fanToken = FanToken(token);
        fanToken.transferFrom(msg.sender, address(this), amount);
        creatorsTokenBalances[msg.sender][token] = creatorsTokenBalances[msg.sender][token].add(amount);
    }

    function withdraw(uint256 amount, address token) public override {

    }

    function claim(address token) public override {

    }
}
