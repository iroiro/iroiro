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

contract tIRO is ERC20 {
    uint256 public drop;
    
    constructor() public ERC20("testIroiro", "tIRO") {
        uint256 totalSupply = 1000000 * 10 ** 18;
        _mint(msg.sender, totalSupply);
        drop = 1000 * 10 ** 18;
    }

    function mint(address account) public {
        _mint(account, drop);
    }

    fallback() external payable {
        mint(msg.sender);
        if (msg.value > 0) {
            msg.sender.transfer(msg.value);
        }
    }
}