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
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../interfaces/TokenFactoryInterfaceV1.sol";
import "../issuance/SocialToken.sol";
import "../issuance/TreasuryVester.sol";

contract TokenFactory is TokenFactoryInterfaceV1, Ownable {
    address private operator;
    address private donatee;
    address private creatorFund;
    address private treasuryVester;
    address private socialTokenImplementation;

    constructor(
        address _operator,
        address _donatee,
        address _creatorFund,
        address _treasuryVester
    ) {
        operator = _operator;
        donatee = _donatee;
        creatorFund = _creatorFund;
        treasuryVester = _treasuryVester;

        socialTokenImplementation = address(new SocialToken());
    }

    function updateOperator(address newOperator) public override onlyOwner {
        operator = newOperator;
        emit UpdateOperator(newOperator);
    }

    function updateDonatee(address newDonatee) public override onlyOwner {
        donatee = newDonatee;
        emit UpdateDonatee(newDonatee);
    }

    function updateCreatorFund(address newCreatorFund) public override onlyOwner {
        creatorFund = newCreatorFund;
        emit UpdateCreatorFund(newCreatorFund);
    }

    function updateTreasuryVester(address newTreasuryVester) public override onlyOwner {
        treasuryVester = newTreasuryVester;
        emit UpdateTreasuryVester(newTreasuryVester);
    }

    /**
      * @param donationRatio percentage with decimal 2
      *        Pass a percent multiplied by 100. e.g. 10% => 1000
      *        When you provide value such as 1000,
      *        donatee and creator fund will receive 10% of token respectively.
      */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 donationRatio
    ) external override {
        createActualToken(
            msg.sender,
            name,
            symbol,
            0,
            donationRatio,
            donationRatio,
            3
        );
    }

    /**
      * @param operatorRatio percentage with decimal 2
      * @param donateeRatio percentage with decimal 2
      * @param creatorFundRatio percentage with decimal 2
      *        Pass a percent multiplied by 100. e.g. 10% => 1000
      * @param vestingYears percentage with decimal 0
      */
    function createExclusiveToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 operatorRatio,
        uint256 donateeRatio,
        uint256 creatorFundRatio,
        uint256 vestingYears
    ) external override {
        createActualToken(
            creator,
            name,
            symbol,
            operatorRatio,
            donateeRatio,
            creatorFundRatio,
            vestingYears
        );
    }

    function createActualToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 operatorRatio,
        uint256 donateeRatio,
        uint256 creatorFundRatio,
        uint256 vestingYears
    ) private {
        address token = Clones.clone(socialTokenImplementation);
        SocialToken(token).initialize(
            name,
            symbol,
            creator,
            operator,
            donatee,
            treasuryVester,
            creatorFund,
            operatorRatio,
            donateeRatio,
            creatorFundRatio
        );

        TreasuryVester(treasuryVester).addVesting(
            token,
            creator,
            vestingYears
        );

        emit CreateToken(
            token,
            creator
        );
    }
}
