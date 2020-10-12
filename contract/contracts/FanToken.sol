pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanToken is ERC20 {
    address private _minter;

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner,
        uint8 decimals,
        address minter // Minter is going to be staking pool contract
    ) public ERC20(name, symbol) {
        _mint(owner, totalSupply);
        _setupDecimals(decimals);
        _minter = minter;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == _minter, "Sender does not have minter role.");
        _mint(account, amount);
    }
}
