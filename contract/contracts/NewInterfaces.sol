// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract DistributerInterface {
    // TODO Add events

    string name;
    address tokenHolder;

    function createCampaign(
        address token,
        address tokenHolder, // Not only TokenHolder contract address but include creator address
        string memory campaignInfoCid,
        string memory recipientsCid,
        string memory recipientsNum,
        uint256 startDate
    ) virtual external {}

    // Future functionality
    // function updateTokenHolder(address newTokenHolder) external; // onlyOwner
}

contract CampaignInterface {
    // TODO Add events

    string campaignInfoCid; // Contains campaign name and description as JSON
    string recipientsCid; // Contains recipients value as JSON
    uint32 recipientsNum;
    uint32 claimedNum;
    address refundDestination; // Use when campaign is cancelled

    // Check msg.sender is claimable
    function isClaimable(address token) virtual external view returns (bool) {}

    // Claim tokens
    function claim(address token) virtual external {}

    function cancelCampaign() virtual external {}

    // This function should be overloaded because arguments could be added for each campaigns
    // Request to Chainlink for checking claimability
    // function requestCheckingIsClaimable(
    //     address _oracle, // which Oracle contract to requests
    //     bytes32 _jobId, // which checking address external adapter contained
    //     uint256 fee // $LINK fee with 18 decimals
    //     Other arguments...
    // ) external returns (bytes32 requestId);
}

contract DonatorInerface {
    // TODO Add events

    mapping(address => address) tokenDonateeList;

    // TODO This function should be restricted for authenticated token owners
    function setDonatee() virtual external {}

    function donate() virtual external {}
}

