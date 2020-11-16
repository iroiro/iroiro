// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract DistributerInterface {
    event CreateCampaign(
        address token,
        string recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate
    );

    string name;
    address tokenHolder;

    function createCampaign(
        address token,
        address tokenHolder, // Not only TokenHolder contract address but include creator address
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate,
        string memory baseURL
    ) virtual external {}

    // Future functionality
    // function updateTokenHolder(address newTokenHolder) external; // onlyOwner
}

// TODO Inherit ChainlinkClient
contract CampaignInterface {
    event Claim(
        uint256 amount
    );
    event UpdateStatus(
        Status status
    );

    enum Status {Active, Cancelled, Ended}

    string campaignInfoCid; // Contains campaign name and description as JSON
    string recipientsCid; // Contains recipients value as JSON
    // TODO Consider a gap between actual JSON elements and claim amounts.
    uint256 claimAmount;
    uint32 claimedNum = 0;
    address refundDestination; // Use when campaign is cancelled
    uint256 startDate;
    uint256 endDate;
    string baseURL;
    Status status;

    // Check msg.sender is claimable
    function isClaimable(address token) virtual external view returns (bool) {}

    // Claim tokens
    function claim(address token) virtual external {}

    function cancelCampaign() virtual external {}

    function endCampaign() virtual external {}

    // This function should be overloaded because arguments could be added for each campaigns
    // Request to Chainlink for checking claimability
    // function requestCheckingIsClaimable(
    //     address _oracle, // which Oracle contract to requests
    //     bytes32 _jobId, // which checking address external adapter contained
    //     uint256 fee // $LINK fee with 18 decimals
    //     Other arguments...
    // ) external returns (bytes32 requestId);
}

contract DonatorInterface {
    event Donate(
        address from,
        address to,
        address token,
        uint256 amount
    );

    mapping(address => address) public tokenDonateeList;

    // TODO This function should be restricted for authenticated token owners
    function setDonatee(address token) virtual external {}

    function donate(address token, uint256 amount) virtual external {}
}

