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
pragma solidity =0.6.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/DonatorInterface.sol";

contract Donator is DonatorInterface {
    // TODO This function should be restricted for authenticated token owners
    function setDonatee(address _token) public override {
        tokenDonateeList[_token] = msg.sender;
    }

    function donate(address _token, uint256 _amount) public override {
        address donatee = tokenDonateeList[_token];
        require(donatee != address(0), "Donatee is not registered yet");
        ERC20 token = ERC20(_token);
        token.transferFrom(msg.sender, donatee, _amount);

        emit Donate(
            msg.sender,
            donatee,
            _token,
            _amount
        );
    }
}
