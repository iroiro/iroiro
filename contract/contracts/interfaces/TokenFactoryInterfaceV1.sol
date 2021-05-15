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

interface TokenFactoryInterfaceV1 {
    event UpdateOperator(address operator);
    event UpdateDonatee(address donatee);
    event UpdateCreatorFund(address creatorFund);
    event UpdateTreasuryVester(address treasuryVester);

    event CreateToken (
        address indexed token,
        address indexed creator
    );

    function updateOperator(address newOperator) external;

    function updateDonatee(address newDonatee) external;

    function updateCreatorFund(address newCreatorFund) external;

    function updateTreasuryVester(address treasuryVester) external;

    function createToken(
        string memory name,
        string memory symbol,
        uint256 donationRatio
    ) external;

    function createExclusiveToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 operationRatio,
        uint256 donationRatio,
        uint256 creatorFundRatio,
        uint256 vestingYears
    ) external;
}

