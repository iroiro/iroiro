// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@iroiro/merkle-distributor/contracts/MerkleDistributor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.6/interfaces/LinkTokenInterface.sol";
import "../interfaces/CampaignInterfaceV2.sol";
import "../interfaces/DistributorInterfaceV2.sol";
import "../SafeMath64.sol";

contract WalletDistributor is DistributorInterfaceV2 {
    constructor (string memory _distributorInfoCid, address _link) public
    DistributorInterfaceV2(_distributorInfoCid) {}

    function createCampaign(
        bytes32 merkleRoot,
        address payable token,
        address tokenSender,
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate
    ) public override {
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
    using SafeMath64 for uint64;

    string public merkleTreeCid;

    // TODO Integrate with parent constructor
    constructor(
        bytes32 merkleRoot,
        address payable _campaignToken,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
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
    {}

    function claim(
        uint256 index,
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) public override mustBeActive inTime {
        super.claim(index, account, amount, merkleProof);

        emit Claim(msg.sender, msg.sender);
    }
}
