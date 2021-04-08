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
import "../interfaces/TokenFactoryInterfaceV1.sol";
import "../issuance/SocialToken.sol";
import "../issuance/TreasuryVester.sol";

// TODO add Clonable ERC20
contract TokenFactory is TokenFactoryInterfaceV1, Ownable {
    using SafeMath for uint256;

    address private operator;
    address private donatee;
    address private creatorFund;
    address private treasuryVester;

    constructor(
        address _operator,
        address _donatee,
        address _creatorFund,
        address _treasuryVester
    ) {
        updateOperator(_operator);
        updateDonatee(_donatee);
        updateCreatorFund(_creatorFund);
        updateTreasuryVester(_treasuryVester);
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

    function createToken(
        string memory name,
        string memory symbol,
        uint256 donationRatio // percentage with decimal 2
    ) external override {
        createActualToken(msg.sender, name, symbol, 0, donationRatio, 3);
    }

    function createExclusiveToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 donationRatio,
        uint256 operationRatio,
        uint256 vestingYears
    ) external override {
        createActualToken(creator, name, symbol, operationRatio, donationRatio, vestingYears);
    }

    function createActualToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 operationRatio,
        uint256 donationRatio,
        uint256 vestingYears
    ) private {
        SocialToken token = new SocialToken(name, symbol, address(this));

        emit CreateToken(
            address(token),
            creator
        );

        transferToken(creator, address(token), operationRatio, donationRatio);
        TreasuryVester(treasuryVester).addVesting(
            address(token),
            creator,
            block.timestamp,
            vestingYears
        );
    }

    function transferToken(
        address creator,
        address _token,
        uint256 operationRatio,
        uint256 donationRatio
    ) internal {
        uint256 distributionRatio = uint256(2000).sub(operationRatio);

        SocialToken token = SocialToken(_token);

        token.transfer(
            creator,
            SocialTokenConstants.totalSupply.mul(distributionRatio).div(10000)
        );
        if (operationRatio > 0) {
            token.transfer(
                operator,
                SocialTokenConstants.totalSupply.mul(operationRatio).div(10000)
            );
        }

        uint256 vestingRatio = uint256(8000).sub(donationRatio);
        token.transfer(
            treasuryVester,
            SocialTokenConstants.totalSupply.mul(vestingRatio).div(10000)
        );
        if (donationRatio > 0) {
            token.transfer(
                donatee,
                SocialTokenConstants.totalSupply.mul(donationRatio.div(2)).div(10000)
            );
            token.transfer(
                creatorFund,
                SocialTokenConstants.totalSupply.mul(donationRatio.div(2)).div(10000)
            );
        }
    }
}
