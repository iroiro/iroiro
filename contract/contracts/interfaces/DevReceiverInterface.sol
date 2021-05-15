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

interface DevReceiverInterface {
    function communityToken() external view returns(address);

    function propertyToken() external view returns(address);

    function maxWithdrawableAmount(uint256 amountToBurn) external view returns(uint256);

    function actualWithdrawableAmount(uint256 amountToBurn) external view returns(uint256);

    function withdraw(uint256 amountToBurn) external;

    function chargeReward() external;
    
    function chargeableReward() external view returns (uint256);

    function rescue(address _erc20) external;
}
