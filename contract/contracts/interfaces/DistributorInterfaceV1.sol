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

contract DistributorInterfaceV1 is Ownable {
    event UpdateDistributorInfo(
        string cid
    );

    event CreateCampaign(
        uint64 indexed distributionId,
        address indexed token,
        address indexed creator,
        string merkleTreeCid,
        string campaignInfoCid
    );

    constructor(string memory distributorInfoCid) {
        emit UpdateDistributorInfo(distributorInfoCid);
    }

    function createCampaign(
        bytes32 merkleRoot,
        address payable token,
        string memory merkleTreeCid,
        string memory campaignInfoCid,
        uint256 allowance
    ) virtual external {}

    function updateDistributorInfo(string calldata distributorInfoCid) external onlyOwner {
        emit UpdateDistributorInfo(distributorInfoCid);
    }
}
