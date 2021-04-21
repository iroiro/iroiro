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
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@devprotocol/protocol/contracts/interface/IAddressConfig.sol";
import "@devprotocol/protocol/contracts/interface/IWithdraw.sol";
import "../interfaces/PropertyTokenManagerInterface.sol";
import "./SocialToken.sol";

contract PropertyTokenManager is PropertyTokenManagerInterface, Ownable {
    using SafeMath for uint256;

    mapping(address => address) public communityTokenToPropertyTokenMap;

    function depositPropertyToken(
        address _communityToken,
        address _propertyToken
    // TODO consider onlyOwner is necessary
    ) external override onlyOwner {
        require(
            communityTokenToPropertyTokenMap[_communityToken] == address(0),
            "Token is already registered."
        );
        communityTokenToPropertyTokenMap[_communityToken] = _propertyToken;

        IERC20(_propertyToken)
        .transferFrom(msg.sender, address(this), SocialTokenConstants.oneTenthOfToken);
    }

    function convert(
        address _communityToken,
        uint256 _communityTokenAmount
    ) external override {
        IERC20 propertyToken = IERC20(address(communityTokenToPropertyTokenMap[_communityToken]));
        ERC20Burnable communityToken = ERC20Burnable(_communityToken);

        uint256 propertyTokenAmount = _communityTokenAmount.div(10);
        // amount * tenth of token / total supply

        communityToken.burnFrom(msg.sender, _communityTokenAmount);
        propertyToken.transfer(msg.sender, propertyTokenAmount);
    }

    function rescue(address _erc20, address _target) external override onlyOwner {
        uint256 balance = IERC20(_erc20).balanceOf(address(this));
        IERC20(_erc20).transfer(_target, balance);
    }
}
