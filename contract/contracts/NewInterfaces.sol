// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DistributerInterface {
    using SafeMath for uint256;

    event CreateCampaign(
        address token,
        string recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate
    );

    constructor(string memory _distributerInfoCid, address _link) public {
        distributerInfoCid = _distributerInfoCid;
        link = _link;
    }

    string public distributerInfoCid;
    address public link;
    uint256 public nextCampaignId = 1;
    mapping(uint256 => address) public campaignList;

    function getAllowanceOf(address token, address owner) internal view returns (uint256) {
        ERC20 erc20 = ERC20(token);
        return erc20.allowance(owner, address(this));
    }

    function calculateClaimAmount(
        uint256 amount,
        uint32 recipientsNum
    ) internal pure returns (uint256) {
        return amount.div(uint256(recipientsNum));
    }

    function createCampaign(
        address payable token,
        address tokenHolder, // Not only TokenHolder contract address but include creator address
        string memory campaignInfoCid,
        string memory recipientsCid,
        uint32 recipientsNum,
        uint256 startDate,
        uint256 endDate
    ) virtual external {}

    function transferToken(
        address token,
        address from,
        address to,
        uint256 amount
    ) internal {
        ERC20 erc20 = ERC20(token);
        erc20.transferFrom(from, to, amount);
    }

    // Future functionality
    // function updateTokenHolder(address newTokenHolder) external; // onlyOwner
}

contract CampaignInterface is ChainlinkClient, Ownable {
    event Claim(
        uint256 amount
    );
    event UpdateStatus(
        Status status
    );

    enum Status {Active, Cancelled, Ended}

    address payable public token;
    string public campaignInfoCid; // Contains campaign name and description as JSON
    string public recipientsCid; // Contains recipients value as JSON
    // TODO Consider a gap between actual JSON elements and claim amounts.
    uint256 public claimAmount;
    uint32 public claimedNum = 0;
    address public refundDestination; // Use when campaign is cancelled
    uint256 public startDate;
    uint256 public endDate;
    Status public status = Status.Active;

    modifier mustBeActive() {
        require(status == Status.Active, "Campaign is not active");
        _;
    }

    constructor(
        address payable _token,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate,
        address _link
    ) public {
        require(_startDate < _endDate, "Start data must be less than end date");

        token = _token;
        campaignInfoCid = _campaignInfoCid;
        recipientsCid = _recipientsCid;
        claimAmount = _claimAmount;
        refundDestination = _refundDestination;
        startDate = _startDate;
        endDate = _endDate;
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
    }

    function cancelCampaign() external onlyOwner {
        require(block.timestamp < startDate, "Campaign is already started");
        status = Status.Cancelled;
        ERC20 erc20 = ERC20(token);
        erc20.transfer(refundDestination, erc20.balanceOf(address(this)));

        emit UpdateStatus(Status.Cancelled);
    }

    function refundRemainingTokens() external onlyOwner {
        require(endDate < block.timestamp, "Campaign is not ended yet");
        status = Status.Ended;
        ERC20 erc20 = ERC20(token);
        erc20.transfer(refundDestination, erc20.balanceOf(address(this)));

        emit UpdateStatus(Status.Ended);
    }

    // Check msg.sender is claimable
    function isClaimable() virtual external view returns (bool) {}

    // Claim tokens
    function claim() virtual external {}

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

