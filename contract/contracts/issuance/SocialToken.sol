// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";

library SocialTokenConstants {
    uint256 public constant totalSupply = 10000000 ether;
    uint256 public constant oneTenthOfToken = 1000000 ether;
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
        uint256 operationRatio,
        uint256 donateeRatio,
        uint256 creatorFundRatio
    ) public initializer {
        _name = tokenName;
        _symbol = tokenSymbol;
        _decimals = 18;

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

        uint256 vestingRatio = SocialTokenConstants.vestingRatio
        .sub(donateeRatio)
        .sub(creatorFundRatio);

        _mint(
            treasuryVester,
            SocialTokenConstants.totalSupply
            .mul(vestingRatio)
            .div(SocialTokenConstants.hundredPercent)
        );

        _mint(
            donatee,
            SocialTokenConstants.totalSupply
            .mul(donateeRatio)
            .div(SocialTokenConstants.hundredPercent)
        );
        _mint(
            creatorFund,
            SocialTokenConstants.totalSupply
            .mul(creatorFundRatio)
            .div(SocialTokenConstants.hundredPercent)
        );
    }
}
