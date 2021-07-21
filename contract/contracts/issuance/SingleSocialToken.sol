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
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./SocialToken.sol";

contract SingleSocialToken is ERC20Burnable, Ownable {
    using SafeMath for uint256;

    event SetManifesto(string cid);

    string private baseURI;
    string private manifestoCid;

    constructor(
        string memory name,
        string memory symbol,
        string memory _baseURI,
        address creator,
        address operator,
        uint256 creatorRatioWithTwoDecimals
    ) ERC20(name, symbol) {
        baseURI = _baseURI;

        _mint(
            creator,
            SocialTokenConstants.totalSupply
            .mul(creatorRatioWithTwoDecimals)
            .div(SocialTokenConstants.hundredPercent)
        );
        _mint(
            operator,
            SocialTokenConstants.totalSupply
            .mul(SocialTokenConstants.hundredPercent.sub(creatorRatioWithTwoDecimals))
            .div(SocialTokenConstants.hundredPercent)
        );
    }

    function updateBaseURI(string calldata newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }

    function setManifestoCid(string calldata _manifestoCid) external onlyOwner {
        manifestoCid = _manifestoCid;

        emit SetManifesto(_manifestoCid);
    }

    function manifestoURI() external view returns (string memory) {
        return string(abi.encodePacked(baseURI, manifestoCid));
    }

}
