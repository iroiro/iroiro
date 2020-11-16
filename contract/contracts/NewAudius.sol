// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./NewInterfaces.sol";

contract AudiusFollowersDistributer is DistributerInterface {

    function createCampaign(
        address token,
        address tokenHolder,
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate,
        string memory baseURL
    ) public override {

        // TODO Calculate amount by balance and recipients num
        uint256 claimAmount = 0;

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

        // Transfer token from tokenHolder

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