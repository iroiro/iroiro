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
pragma solidity =0.7.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SingleTreasuryVester {
    using SafeMath for uint256;

    IERC20 public token;
    address public recipient;
    uint256 public vestingAmount;
    uint256 public vestingStart;
    uint256 public vestingEnd;
    uint256 public lastUpdate;

    constructor(
        address _token,
        address _recipient,
        uint256 _vestingAmount,
        uint256 vestingYears
    ) {
        token = IERC20(_token);
        vestingAmount = _vestingAmount;
        recipient = _recipient;
        vestingStart = block.timestamp;
        vestingEnd = block.timestamp.add(vestingYears.mul(365 days));
        lastUpdate = block.timestamp;
    }

    function redeem() external {
        uint256 amount = redeemableAmount();
        lastUpdate = block.timestamp;

        token.transfer(recipient, amount);
    }

    function remainingAmount() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function redeemableAmount() public view returns (uint256){
        uint256 amount;
        if (block.timestamp >= vestingEnd) {
            amount = token.balanceOf(address(this));
        } else {
            amount = vestingAmount
            .mul(block.timestamp.sub(lastUpdate))
            .div(vestingEnd.sub(vestingStart));
        }

        return amount;
    }
}

