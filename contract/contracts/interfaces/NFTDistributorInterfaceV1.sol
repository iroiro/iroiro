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
pragma solidity =0.7.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTDistributorInterfaceV1 is ERC1155, Ownable {
    using Strings for uint256;

    string private _uri;

    event UpdateDistributorInfo(
        string cid
    );

    event CreateCampaign(
        uint256 indexed treeId, // same as tokenId
        address indexed creator,
        string merkleTreeCid,
        string nftMetadataCid
    );

    constructor(
        string memory distributorInfoCid,
        string memory uri
    ) ERC1155("") {
        _uri = uri;
        emit UpdateDistributorInfo(distributorInfoCid);
    }

    function uri(uint256 tokenId) external view override returns (string memory) {
        return string(abi.encodePacked(_uri, tokenId.toString()));
    }

    function createCampaign(
        bytes32 merkleRoot,
        string memory merkleTreeCid,
        string memory nftMetadataCid
    ) virtual external {}

    function setURI(string calldata newURI) external onlyOwner {
        _uri = newURI;
    }

    function updateDistributorInfo(string calldata distributorInfoCid) external onlyOwner {
        emit UpdateDistributorInfo(distributorInfoCid);
    }
}
