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
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "@devprotocol/protocol/contracts/interface/IAddressConfig.sol";
import "@devprotocol/protocol/contracts/interface/IProperty.sol";
import "@devprotocol/protocol/contracts/interface/IWithdraw.sol";
import "../interfaces/DevReceiverInterface.sol";

contract DevReceiver is DevReceiverInterface, Initializable {
    using SafeMath for uint256;

    address private constant addressConfig = 0x1D415aa39D647834786EB9B5a333A50e9935b796;

    address private __communityToken;
    address private __propertyToken;

    function initialize(
        address _communityToken,
        address _propertyToken
    ) external initializer {
        __communityToken = _communityToken;
        __propertyToken = _propertyToken;
    }

    function communityToken() external override view returns (address) {
        return __communityToken;
    }

    function propertyToken() external override view returns (address) {
        return __propertyToken;
    }

    /**
     * Returns withdrawable DEV amount which calculated with balance of contract and unwithdrawn reward.
     * @param amountToBurn Community token amount to burn to withdraw DEV reward
     */
    function maxWithdrawableAmount(
        uint256 amountToBurn
    ) external override view returns (uint256) {
        return calculateAmountToWithdraw(
            ERC20(IAddressConfig(addressConfig).token())
            .balanceOf(address(this))
            .add(chargeableReward()),
            amountToBurn
        );
    }

    /**
     * Returns withdrawable DEV amount which calculated with only balance of contract.
     * @param amountToBurn Community token amount to burn to withdraw DEV reward
     */
    function actualWithdrawableAmount(
        uint256 amountToBurn
    ) external override view returns (uint256) {
        return calculateAmountToWithdraw(
            ERC20(IAddressConfig(addressConfig).token()).balanceOf(address(this)),
            amountToBurn
        );
    }

    /**
     * Withdraw DEV which calculated with only balance of contract.
     * @param amountToBurn Community token amount to burn to withdraw DEV reward
     */
    function withdraw(uint256 amountToBurn) external override {
        ERC20 dev = ERC20(IAddressConfig(addressConfig).token());
        uint256 amountToWithdraw = calculateAmountToWithdraw(
            dev.balanceOf(address(this)),
            amountToBurn
        );

        ERC20Burnable(__communityToken).burnFrom(msg.sender, amountToBurn);
        dev.transfer(msg.sender, amountToWithdraw);
    }

    /**
     * Calculate withdrawable amount
     * @param totalAmount Total amount of DEV
     * @param amountToBurn Community token amount to burn to withdraw DEV reward
     */
    function calculateAmountToWithdraw(
        uint256 totalAmount,
        uint amountToBurn
    ) internal view returns(uint256 allocation) {
        return totalAmount
        .mul(amountToBurn)
        .div(ERC20(__communityToken).totalSupply());
    }

    /**
     * Withdraw DEV reward from Withdraw contract of Dev Protocol.
     * See also: https://github.com/dev-protocol/protocol/blob/8bae6d7df5dd724874f8ad6ccf120efbf98d859d/contracts/src/withdraw/Withdraw.sol#L34-L92
     */
    function chargeReward() external override {
        IWithdraw(IAddressConfig(addressConfig).withdraw())
        .withdraw(__propertyToken);
    }

    /**
     * Get DEV reward amount from Witndraw contract of Dev Protocol.
     * See also https://github.com/dev-protocol/protocol/blob/8bae6d7df5dd724874f8ad6ccf120efbf98d859d/contracts/src/withdraw/Withdraw.sol#L210-L220
     */
    function chargeableReward() public view override returns (uint256) {
        return IWithdraw(IAddressConfig(addressConfig).withdraw())
        .calculateWithdrawableAmount(__propertyToken, address(this));
    }

    /**
     * Withdraw property token and remaining DEV by author.
     * @param _erc20 A token address which author want to rescue.
     */
    function rescue(address _erc20) external override {
        address propertyAuthor = IProperty(__propertyToken).author();
        require(msg.sender == propertyAuthor, "Only property author is able to rescue token");

        ERC20(_erc20).transfer(
            propertyAuthor,
            ERC20(_erc20).balanceOf(address(this))
        );
    }
}
