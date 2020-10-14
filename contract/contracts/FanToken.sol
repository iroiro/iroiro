pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanToken is ERC20 {
    address private minter;
    uint8 public creatorTokenRatio; // fansTokenRatio = 100 - creatorTokenRatio
    uint8 public lockupPeriod; // years

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner,
        uint8 decimals,
        address _minter, // Minter is going to be staking pool contract
        uint8 _creatorTokenRatio,
        uint8 _lockupPeriod
    ) public ERC20(name, symbol) {
        _mint(owner, totalSupply);
        _setupDecimals(decimals);
        minter = _minter;
        creatorTokenRatio = _creatorTokenRatio;
        lockupPeriod = _lockupPeriod;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == minter, "Sender does not have minter role.");
        _mint(account, amount);
    }
}
