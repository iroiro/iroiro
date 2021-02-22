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

import "@iroiro/merkle-distributor/contracts/MerkleDistributor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/CampaignInterfaceV2.sol";
import "../interfaces/DistributorInterfaceV2.sol";
import "../SafeMath32.sol";

contract WalletDistributor is DistributorInterfaceV2 {
    constructor (string memory _distributorInfoCid) public
    DistributorInterfaceV2(_distributorInfoCid) {}

    function createCampaign(
        bytes32 merkleRoot,
        address payable token,
        address tokenSender,
        string memory campaignInfoCid,
        string memory recipientsCid,
        string memory merkleTreeCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate
    ) external override {
        // TODO Update checking tokenSender logic with token issuance phase
        require(msg.sender == tokenSender, "Token holder must match to msg.sender");
        uint256 allowance = getAllowanceOf(token, tokenSender);
        require(allowance > 0, "No token is approved to transfer");
        require(allowance >= recipientsNum, "Token amount is not enough to distribute");

        uint256 claimAmount = calculateClaimAmount(allowance, recipientsNum);
        WalletCampaign campaign = new WalletCampaign(
            merkleRoot,
            token,
            campaignInfoCid,
            recipientsCid,
            merkleTreeCid,
            claimAmount,
            tokenSender,
            startDate,
            endDate
        );
        transferToken(token, tokenSender, address(campaign), allowance);
        campaignList[nextCampaignId] = address(campaign);
        nextCampaignId = nextCampaignId.add(1);
        campaign.transferOwnership(msg.sender);

        emit CreateCampaign(
            address(campaign),
            token,
            msg.sender
        );
    }
}

contract WalletCampaign is CampaignInterfaceV2, MerkleDistributor {
    using SafeMath32 for uint32;

    string public merkleTreeCid;

    constructor(
        bytes32 merkleRoot,
        address payable _campaignToken,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        string memory _merkleTreeCid,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate
    ) public
    CampaignInterfaceV2(
        _campaignToken,
        _campaignInfoCid,
        _recipientsCid,
        _claimAmount,
        _refundDestination,
        _startDate,
        _endDate
    )
    MerkleDistributor(_campaignToken, merkleRoot)
    {
        merkleTreeCid = _merkleTreeCid;
    }

    function claim(
        uint256 index,
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) public override mustBeActive inTime {
        super.claim(index, account, amount, merkleProof);
        claimedNum = claimedNum.add(1);

        emit Claim(account, account);
    }
}
