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

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@devprotocol/protocol/contracts/interface/IAddressConfig.sol";
import "@devprotocol/protocol/contracts/interface/IWithdraw.sol";
import "../interfaces/DevReceiverInterface.sol";

contract DevReceiver is DevReceiverInterface, Initializable {
    using SafeMath for uint256;

    address private constant addressConfig = 0x1D415aa39D647834786EB9B5a333A50e9935b796;
    address private constant devToken = 0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26;

    address private __propertyAuthor;
    address private __communityToken;
    address private __propertyToken;

    function initialize(
        address _communityToken,
        address _propertyToken,
        address _propertyAuthor
    ) external initializer {
        __communityToken = _communityToken;
        __propertyToken = _propertyToken;
        __propertyAuthor = _propertyAuthor;
    }

    function communityToken() external override view returns (address) {
        return __communityToken;
    }

    function propertyToken() external override view returns (address) {
        return __propertyToken;
    }

    function withdrawableAmount(
        uint256 amountToBurn
    ) external override view returns (uint256) {
        uint256 _amount = getWithdrawableAmount();

        ERC20Burnable dev = ERC20Burnable(IAddressConfig(addressConfig).token());
        uint256 totalAmount = dev.balanceOf(address(this)).add(_amount);

        ERC20Burnable _communityToken = ERC20Burnable(__communityToken);

        return totalAmount
        .mul(amountToBurn)
        .div(_communityToken.totalSupply());
    }

    function withdraw(uint256 amountToBurn) external override {
        withdrawDev();

        ERC20Burnable dev = ERC20Burnable(IAddressConfig(addressConfig).token());
        uint256 totalAmount = dev.balanceOf(address(this));
        ERC20Burnable _communityToken = ERC20Burnable(__communityToken);

        dev.transfer(
            msg.sender,
            totalAmount.mul(amountToBurn).div(_communityToken.totalSupply())
        );
        _communityToken.burnFrom(
            msg.sender,
            amountToBurn
        );
    }

    function rescue(address _erc20) external override {
        require(msg.sender == __propertyAuthor, "Only property author is able to rescue token");

        if (_erc20 == devToken) {
            withdrawDev();
        }

        uint256 balance = ERC20Burnable(_erc20).balanceOf(address(this));
        ERC20Burnable(_erc20).transfer(msg.sender, balance);
    }

    function withdrawDev() internal {
        uint256 _amount = getWithdrawableAmount();

        if (_amount > 0) {
            address _withdraw = IAddressConfig(addressConfig).withdraw();
            IWithdraw(_withdraw).withdraw(__propertyToken);
        }
    }

    function getWithdrawableAmount() internal view returns (uint256) {
        IWithdraw _withdraw = IWithdraw(IAddressConfig(addressConfig).withdraw());
        return _withdraw.calculateWithdrawableAmount(__propertyToken, address(this));
    }
}
