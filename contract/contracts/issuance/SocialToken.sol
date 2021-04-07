// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

library SocialTokenConstants {
    uint256 public constant totalSupply = 10000000 ether;
}

contract SocialToken is ERC20Burnable {
    constructor(
        string memory name,
        string memory symbol,
        address factory
    ) public ERC20(name, symbol) {
        _mint(factory, SocialTokenConstants.totalSupply);
    }
}
