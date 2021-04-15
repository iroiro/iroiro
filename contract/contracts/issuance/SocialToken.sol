// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20BurnableUpgradeable.sol";

library SocialTokenConstants {
    uint256 public constant totalSupply = 10000000 ether;
    uint256 public constant hundredPercent = 10000;
    uint256 public constant distributionRatio = 2000;
    uint256 public constant vestingRatio = 8000;
}

// TODO use non-upgradeable
contract SocialToken is Initializable, ERC20BurnableUpgradeable {
    function initialize(
        string memory name,
        string memory symbol,
        address to
    ) public initializer {
        __ERC20_init(name, symbol);

        // TODO import transfer logic and change to mint
        _mint(to, SocialTokenConstants.totalSupply);
    }
}
