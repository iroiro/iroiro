// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DonatorInterface {
    event Donate(
        address from,
        address to,
        address token,
        uint256 amount
    );

    mapping(address => address) public tokenDonateeList;

    // TODO This function should be restricted for authenticated token owners
    function setDonatee(address token) virtual external {}

    function donate(address token, uint256 amount) virtual external {}
}

