// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./FanToken.sol";

contract Vesting is Ownable {
    using SafeMath for uint256;

    mapping(address => bool) public vestingTokens;
    mapping(address => uint256) public tokensVestingAmount;
    mapping(address => address) public tokensRecipient;
    mapping(address => uint256) public tokensVestingStart;
    mapping(address => uint256) public tokensVestingEnd;
    mapping(address => uint256) public tokensLastUpdate;

    function remainingAmount(address token) public view returns(uint256) {
        FanToken fanToken = FanToken(token);
        return fanToken.balanceOf(address(this));
    }

    function addVesting(
        address token,
        address recipient,
        uint256 vestingStart,
        uint256 vestingEnd
    ) external onlyOwner {
        require(!vestingTokens[token], "Token is already registered");
        vestingTokens[token] = true;
        tokensVestingAmount[token] = remainingAmount(token);
        tokensRecipient[token] = recipient;
        tokensVestingStart[token] = vestingStart;
        tokensVestingEnd[token] = vestingEnd;
        tokensLastUpdate[token] = vestingStart;
    }

    function redeem(address token) external {
        require(vestingTokens[token], "Token is not registered");
        require(block.timestamp >= tokensVestingStart[token], "Vesting is not started yet");

        FanToken fanToken = FanToken(token);
        uint256 amount = redeemableAmount(token);
        tokensLastUpdate[token] = block.timestamp;

        fanToken.transfer(tokensRecipient[token], amount);
    }

    function redeemableAmount(address token) public view returns(uint256){
        FanToken fanToken = FanToken(token);
        uint256 amount;
        if (block.timestamp >= tokensVestingEnd[token]) {
            amount = fanToken.balanceOf(address(this));
        } else {
            amount = tokensVestingAmount[token]
            .mul(block.timestamp - tokensLastUpdate[token])
            .div(tokensVestingEnd[token] - tokensVestingStart[token]);
        }

        return amount;
    }
}
