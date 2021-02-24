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

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DistributorInterface {
    using SafeMath for uint256;

    event CreateCampaign(
        address indexed campaign,
        address indexed token,
        address indexed creator
    );

    constructor(string memory _distributorInfoCid, address _link) public {
        distributorInfoCid = _distributorInfoCid;
        link = _link;
    }

    string public distributorInfoCid;
    // TODO: Add features updatable or whitelist
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
