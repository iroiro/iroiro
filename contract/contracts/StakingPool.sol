pragma solidity ^0.6.0;

import "./interfaces.sol";

contract StakingPool is PoolInterface {
    function earned(address account, address token) public override view returns(uint256) {
        return 0;
    }

    function stake(uint256 amount, address token) public override {

    }

    function withdraw(uint256 amount, address token) public override {

    }

    function claim(address token) public override {

    }
}
