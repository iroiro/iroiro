// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

library SocialTokenConstants {
    uint256 public constant totalSupply = 10000000 ether;
    uint256 public constant hundredPercent = 10000;
    uint256 public constant distributionRatio = 2000;
    uint256 public constant vestingRatio = 8000;
}

// TODO use non-upgradeable
contract SocialToken is Initializable, ERC20BurnableUpgradeable {
    using SafeMath for uint256;

    function initialize(
        string memory name,
        string memory symbol,
        address creator,
        address operator,
        address donatee,
        address treasuryVester,
        address creatorFund,
        uint256 operationRatio,
        uint256 donationRatio
    ) public initializer {
        __ERC20_init(name, symbol);

        uint256 distributionRatio = SocialTokenConstants.distributionRatio.sub(operationRatio);
        _mint(
            creator,
            SocialTokenConstants.totalSupply
            .mul(distributionRatio)
            .div(SocialTokenConstants.hundredPercent)
        );
        if (operationRatio > 0) {
            _mint(
                operator,
                SocialTokenConstants.totalSupply
                .mul(operationRatio)
                .div(SocialTokenConstants.hundredPercent)
            );
        }

        uint256 vestingRatio = SocialTokenConstants.vestingRatio.sub(donationRatio);
        _mint(
            treasuryVester,
            SocialTokenConstants.totalSupply
            .mul(vestingRatio)
            .div(SocialTokenConstants.hundredPercent)
        );
        if (donationRatio > 0) {
            _mint(
                donatee,
                SocialTokenConstants.totalSupply
                .mul(donationRatio.div(2))
                .div(SocialTokenConstants.hundredPercent)
            );
            _mint(
                creatorFund,
                SocialTokenConstants.totalSupply
                .mul(donationRatio.div(2))
                .div(SocialTokenConstants.hundredPercent)
            );
        }
    }
}
