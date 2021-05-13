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

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@devprotocol/protocol/contracts/interface/IProperty.sol";
import "./DevReceiver.sol";

contract DevReceiverFactory {
    event CreateDevReceiver(
        address indexed creator,
        address indexed communityToken,
        address indexed propertyToken,
        address devReceiver
    );

    address private devReceiverImplementation;

    constructor() {
        devReceiverImplementation = address(new DevReceiver());
    }

    function createDevReceiver(
        address communityToken,
        address propertyToken
    ) external {
        require(
            msg.sender == IProperty(propertyToken).author(),
            "Only property author is able to create Dev Receiver"
        );
        address newDevReceiver = Clones.clone(devReceiverImplementation);
        DevReceiver(newDevReceiver).initialize(communityToken, propertyToken);

        emit CreateDevReceiver(
            msg.sender,
            communityToken,
            propertyToken,
            newDevReceiver
        );
    }
}
