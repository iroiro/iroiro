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
    string public recipientsCid;
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
        require(_startDate < _endDate, "Start date must be less than end date");

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
