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

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";

library SocialTokenConstants {
    uint256 public constant totalSupply = 10000000 ether;
    uint256 public constant hundredPercent = 10000;
    uint256 public constant distributionRatio = 2000;
    uint256 public constant vestingRatio = 8000;
}

contract SocialToken is Initializable, ERC20Burnable {
    using SafeMath for uint256;

    string private _name;

    string private _symbol;

    uint8 private _decimals;

    constructor() ERC20("", "") {}

    function name() public override view virtual returns (string memory) {
        return _name;
    }

    function symbol() public override view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public override view virtual returns (uint8) {
        return _decimals;
    }

    function initialize(
        string memory tokenName,
        string memory tokenSymbol,
        address creator,
        address operator,
        address donatee,
        address treasuryVester,
        address creatorFund,
        uint256 operatorRatio,
        uint256 donateeRatio,
        uint256 creatorFundRatio
    ) public initializer {
        _name = tokenName;
        _symbol = tokenSymbol;
        _decimals = 18;

        if (operatorRatio == 0) {
            _mint(
                creator,
                SocialTokenConstants.totalSupply
                .mul(SocialTokenConstants.distributionRatio)
                .div(SocialTokenConstants.hundredPercent)
            );
        } else {
            _mint(
                creator,
                SocialTokenConstants.totalSupply
                .mul(SocialTokenConstants.distributionRatio.sub(operatorRatio))
                .div(SocialTokenConstants.hundredPercent)
            );
            _mint(
                operator,
                SocialTokenConstants.totalSupply
                .mul(operatorRatio)
                .div(SocialTokenConstants.hundredPercent)
            );
        }

        _mint(
            treasuryVester,
            SocialTokenConstants.totalSupply
            .mul(SocialTokenConstants.vestingRatio.sub(donateeRatio).sub(creatorFundRatio))
            .div(SocialTokenConstants.hundredPercent)
        );
        if (donateeRatio != 0) {
            _mint(
                donatee,
                SocialTokenConstants.totalSupply
                .mul(donateeRatio)
                .div(SocialTokenConstants.hundredPercent)
            );
        }
        if (SocialTokenConstants.totalSupply > totalSupply()) {
            _mint(
                creatorFund,
                SocialTokenConstants.totalSupply - totalSupply()
            );
        }
    }
}
