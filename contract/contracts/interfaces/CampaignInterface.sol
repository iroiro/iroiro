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

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CampaignInterface is ChainlinkClient, Ownable {
    event Claim(
        address indexed from,
        address indexed to
    );
    // TODO Remove arg
    event UpdateStatus();

    enum Status {Active, Cancelled, Ended}

    address payable public token;
    string public campaignInfoCid; // Contains campaign name and description as JSON
    string public recipientsCid; // Contains recipients value as JSON
    uint256 public campaignId;
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
        address payable _token,
        string memory _campaignInfoCid,
        string memory _recipientsCid,
        uint256 _campaignId,
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
        campaignId = _campaignId;
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

        emit UpdateStatus();
    }

    function refundRemainingTokens() external onlyOwner {
        require(endDate < block.timestamp, "Campaign is not ended yet");
        status = Status.Ended;
        ERC20 erc20 = ERC20(token);
        erc20.transfer(refundDestination, erc20.balanceOf(address(this)));

        emit UpdateStatus();
    }

    // These functions should be overloaded because arguments could be added for each campaigns
    // Check msg.sender is claimable
    // function isClaimable(address user) virtual external view returns (bool) {}
    //
    // Claim tokens
    // function claim() virtual external {}
    //
    // Request to Chainlink for checking claimability
    // function requestCheckingIsClaimable(
    //     address _oracle, // which Oracle contract to requests
    //     bytes32 _jobId, // which checking address external adapter contained
    //     uint256 fee // $LINK fee with 18 decimals
    //     Other arguments...
    // ) external returns (bytes32 requestId);
}
