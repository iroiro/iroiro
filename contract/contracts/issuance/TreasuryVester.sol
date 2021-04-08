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

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/TreasuryVesterInterfaceV1.sol";
import "../issuance/SocialToken.sol";

contract TreasuryVester is TreasuryVesterInterfaceV1, Ownable {
    using SafeMath for uint256;

    mapping(address => bool) public vestingTokens;
    mapping(address => uint256) public tokensVestingAmount;
    mapping(address => address) public tokensRecipient;
    mapping(address => uint256) public tokensVestingStart;
    mapping(address => uint256) public tokensVestingEnd;
    mapping(address => uint256) public tokensLastUpdate;

    // TODO check gas fees for token transfer between transfer beforehand or approve and transfer
    function addVesting(
        address token,
        address recipient,
        uint256 vestingStart
    ) external override onlyOwner {
        require(!vestingTokens[token], "Token is already registered");
        vestingTokens[token] = true;
        tokensVestingAmount[token] = remainingAmount(token);
        tokensRecipient[token] = recipient;
        tokensVestingStart[token] = vestingStart;
        tokensVestingEnd[token] = vestingStart.add(1095 days); // 3 * 365 days
        tokensLastUpdate[token] = vestingStart;
    }

    function redeem(address token) external override {
        require(vestingTokens[token], "Token is not registered");

        SocialToken socialToken = SocialToken(token);
        uint256 amount = redeemableAmountOf(token);
        tokensLastUpdate[token] = block.timestamp;

        socialToken.transfer(tokensRecipient[token], amount);
    }

    // TODO update name as remainingAmount"Of"
    function remainingAmount(address token) public override view returns (uint256) {
        SocialToken socialToken = SocialToken(token);
        return socialToken.balanceOf(address(this));
    }

    function redeemableAmountOf(address token) public override view returns (uint256){
        uint256 amount;
        if (block.timestamp >= tokensVestingEnd[token]) {
            SocialToken socialToken = SocialToken(token);
            amount = socialToken.balanceOf(address(this));
        } else {
            amount = tokensVestingAmount[token]
            .mul(block.timestamp - tokensLastUpdate[token])
            .div(tokensVestingEnd[token] - tokensVestingStart[token]);
        }

        return amount;
    }
}

