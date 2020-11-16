// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./NewInterfaces.sol";

contract AudiusFollowersDistributer is DistributerInterface {
    function createCampaign(
        address token,
        // TODO Update arg name to `tokenSender`
        address tokenHolder,
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate,
        string memory baseURL
    ) public override {
        // TODO Update checking TokenHolder logic with token issuance phase
        require(msg.sender == tokenHolder, "Token holder must match to msg.sender");
        uint256 allowance = getAllowanceOf(token, tokenHolder);
        require(allowance > 0, "No token is approved to transfer");
        require(allowance > recipientsNum, "Token amount is not enough to distribute");

        uint256 claimAmount = calculateClaimAmount(allowance, recipientsNum);
        AudiusFollowersCampaign campaign = new AudiusFollowersCampaign(
            token,
            campaignInfoCid,
            recipientsCid,
            claimAmount,
            tokenHolder,
            startDate,
            endDate,
            baseURL
        );
        transferToken(token, tokenHolder, address(campaign), allowance);

        emit CreateCampaign(
            token,
            recipientsCid,
            recipientsNum,
            startDate,
            endDate
        );
    }
}

contract AudiusFollowersCampaign is CampaignInterface {
    constructor(
        address _token,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate,
        string memory _baseURL
    ) public {
        campaignInfoCid = _campaignInfoCid;
        recipientsCid = _recipientsCid;
        claimAmount = _claimAmount;
        status = Status.Active;
    }

    function isClaimable(address token) public view override returns (bool) {
        return true;
    }

    function claim(address token) external override {
        emit Claim(claimAmount);
    }

    function cancelCampaign() external override {
        emit UpdateStatus(Status.Cancelled);
    }

    function endCampaign() external override {
        emit UpdateStatus(Status.Ended);
    }

    function requestCheckingIsClaimable(
        address _oracle,
        bytes32 _jobId,
        uint256 fee
    // TODO Add other arguments for actual request
    ) external returns (bytes32 requestId) {

    }
}