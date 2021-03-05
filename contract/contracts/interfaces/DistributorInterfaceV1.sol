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

contract DistributorInterfaceV1 {
    event CreateDistributor(
        address indexed distributor,
        string distributorInfoCid
    );

    event CreateCampaign(
        uint256 indexed campaignId,
        address indexed token,
        address indexed creator,
        string merkleTreeCid,
        string campaignInfoCid
    );

    constructor(string memory _distributorInfoCid) {
        emit CreateDistributor(address(this), distributorInfoCid);
    }

    string public distributorInfoCid;
    // TODO: Add features updatable or whitelist
    uint256 public nextCampaignId = 1;

    function createCampaign(
        bytes32 merkleRoot,
        address payable token,
        string memory merkleTreeCid,
        string memory campaignInfoCid,
        uint256 allowance
    ) virtual external {}
}
