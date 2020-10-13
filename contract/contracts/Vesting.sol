pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vesting is Ownable {

    mapping(address => bool) public vestingTokens;
    mapping(address => uint256) public tokensVestingAmount;
    mapping(address => address) public tokensRecipient;
    mapping(address => uint256) public tokensVestingStart;
    mapping(address => uint256) public tokensVestingEnd;

    function addVesting(
        address token,
        address recipient,
        uint256 vestingAmount,
        uint256 vestingStart,
        uint256 vestingEnd
    ) public onlyOwner {
        require(!vestingTokens[token], "Token is already registered");
        vestingTokens[token] = true;
        tokensVestingAmount[token] = vestingAmount;
        tokensRecipient[token] = recipient;
        tokensVestingStart[token] = vestingStart;
        tokensVestingEnd[token] = vestingEnd;
    }

    function redeem(address token) public {

    }
}
