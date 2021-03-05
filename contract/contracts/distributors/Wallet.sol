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
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/DistributorInterfaceV1.sol";
import "../SafeMath32.sol";

contract WalletDistributor is DistributorInterfaceV1, MerkleDistributorManager {
    using SafeMath for uint256;
    using SafeMath32 for uint32;

    constructor (string memory _distributorInfoCid)
    DistributorInterfaceV1(_distributorInfoCid) {}

    function createCampaign(
        bytes32 merkleRoot,
        address payable token,
        string memory merkleTreeCid,
        string memory campaignInfoCid,
        uint256 allowance
    ) external override {
        tokenMap[nextCampaignId] = token;
        merkleRootMap[nextCampaignId] = merkleRoot;
        merkleTreeCidMap[nextCampaignId] = merkleTreeCid;
        campaignInfoCidMap[nextCampaignId] = campaignInfoCid;
        ERC20 erc20 = ERC20(token);
        remainingAmountMap[nextCampaignId] = allowance;

        erc20.transferFrom(msg.sender, address(this), allowance);

        emit CreateCampaign(
            nextCampaignId,
            token,
            msg.sender
        );

        nextCampaignId = nextCampaignId.add(1);
    }

    function claim(
        uint256 campaignId,
        uint256 index,
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) public override {
        claimedNum = claimedNum.add(1);
        super.claim(campaignId, index, account, amount, merkleProof);

        emit Claim(account, account);
    }
}
