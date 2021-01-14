// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CampaignInterfaceV2 is Ownable {
    event Claim(
        address indexed from,
        address indexed to
    );

    event UpdateStatus();

    enum Status {Active, Cancelled, Ended}

    address payable public campaignToken;
    string public campaignInfoCid; // Contains campaign name and description as JSON
    string public recipientsCid; // Contains recipients value as JSON
    // TODO Consider a gap between actual JSON elements and claim amounts.
    uint256 public claimAmount;
    uint32 public claimedNum = 0;
    address public refundDestination; // Use when campaign is cancelled
    uint256 public startDate;
    uint256 public endDate;
    Status public status = Status.Active;

    modifier inTime() {
        require(startDate <= block.timestamp, "Campaign is not started yet");
        require(block.timestamp < endDate, "Campaign is finished");
        _;
    }

    modifier mustBeActive() {
        require(status == Status.Active, "Campaign is not active");
        _;
    }

    constructor(
        address payable _campaignToken,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _claimAmount,
        address _refundDestination,
        uint256 _startDate,
        uint256 _endDate
    ) public {
        require(_startDate < _endDate, "Start data must be less than end date");

        campaignToken = _campaignToken;
        campaignInfoCid = _campaignInfoCid;
        recipientsCid = _recipientsCid;
        claimAmount = _claimAmount;
        refundDestination = _refundDestination;
        startDate = _startDate;
        endDate = _endDate;
    }

    function cancelCampaign() external onlyOwner {
        require(block.timestamp < startDate, "Campaign is already started");
        status = Status.Cancelled;
        ERC20 erc20 = ERC20(campaignToken);
        erc20.transfer(refundDestination, erc20.balanceOf(address(this)));

        emit UpdateStatus();
    }

    function refundRemainingTokens() external onlyOwner {
        require(endDate < block.timestamp, "Campaign is not ended yet");
        status = Status.Ended;
        ERC20 erc20 = ERC20(campaignToken);
        erc20.transfer(refundDestination, erc20.balanceOf(address(this)));

        emit UpdateStatus();
    }
}
