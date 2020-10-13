pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Owner must be TokenFactory
contract StakingPool is PoolInterface, Ownable {
    using SafeMath for uint256;

    event Stake(
        address indexed from,
        address indexed token,
        uint256 amount
    );

    event Withdraw(
        address indexed from,
        address indexed token,
        uint256 amount
    );

    mapping(address => uint256) public tokensTotalSupply;
    mapping(address => mapping(address => uint256)) private creatorsTokenBalances;
    mapping(address => bool) public registeredTokens;

    function balanceOf(address account, address token) public view returns (uint256){
        return creatorsTokenBalances[account][token];
    }

    function addTokenToStakingList(address token) public onlyOwner {
        registeredTokens[token] = true;
    }

    function earned(
        address account,
        address token,
        uint256 totalSupply,
        uint8 decimals
    ) public override view returns (uint256) {
        // TODO: claim amount is currently simplest mock. It will be replaced with formula
        return balanceOf(account, token).mul(10 ** uint256(decimals)).div(totalSupply);
    }

    function stake(uint256 amount, address token) public override {
        require(registeredTokens[token], "Token is not registered to staking list");

        creatorsTokenBalances[msg.sender][token] = creatorsTokenBalances[msg.sender][token].add(amount);
        tokensTotalSupply[token] = tokensTotalSupply[token].add(amount);
        FanToken fanToken = FanToken(token);
        fanToken.transferFrom(msg.sender, address(this), amount);

        emit Stake(msg.sender, token, amount);
    }

    function withdraw(uint256 amount, address token) public override {
        creatorsTokenBalances[msg.sender][token] = creatorsTokenBalances[msg.sender][token].sub(amount);
        tokensTotalSupply[token] = tokensTotalSupply[token].sub(amount);
        FanToken fanToken = FanToken(token);
        fanToken.transfer(msg.sender, amount);

        emit Withdraw(msg.sender, token, amount);
    }

    function claim(address token) public override {
        FanToken fanToken = FanToken(token);
        uint256 totalSupply = fanToken.totalSupply();
        uint8 decimals = fanToken.decimals();
        fanToken.mint(msg.sender, earned(msg.sender, token, totalSupply, decimals));
    }
}
