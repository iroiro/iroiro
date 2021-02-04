// SPDX-License-Identifier: GPL-3.0
/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanToken is ERC20 {
    address private minter;
    uint8 public creatorTokenRatio;
    uint8 public lockupPeriod;

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner,
        uint8 decimals,
        address _minter, // Minter is going to be staking pool contract
        uint8 _creatorTokenRatio, // fansTokenRatio = 100 - creatorTokenRatio
        uint8 _lockupPeriod // years
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
