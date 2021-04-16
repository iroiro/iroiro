// SPDX-License-Identifier: UNLICENSED
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
    constructor() ERC20("", "") {}

    function name() public override view virtual returns (string memory) {
        return _name;
    }

    function symbol() public override view virtual returns (string memory) {
        return _symbol;
    }

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
        _name = name;
        _symbol = symbol;

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
