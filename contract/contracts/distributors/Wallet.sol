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

import "@iroiro/merkle-distributor/contracts/MerkleDistributorManager.sol";
import "@iroiro/merkle-distributor/contracts/SafeMath64.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/DistributorInterfaceV1.sol";

contract WalletDistributor is DistributorInterfaceV1, MerkleDistributorManager {
    using SafeMath64 for uint64;

    constructor (string memory _distributorInfoCid)
    DistributorInterfaceV1(_distributorInfoCid) {}

    function createCampaign(
        bytes32 merkleRoot,
        address payable token,
        string calldata merkleTreeCid,
        string calldata campaignInfoCid,
        uint256 allowance
    ) external override {
        addDistribution(token, merkleRoot, allowance);

        emit CreateCampaign(
            nextCampaignId.sub(1),
            token,
            msg.sender,
            merkleTreeCid,
            campaignInfoCid
        );
    }
}
