pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner,
        uint8 decimals
    ) public ERC20(name, symbol) {
        // mint for creator and fans separately.
        _mint(owner, totalSupply);
        _setupDecimals(decimals);
    }
}
