// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20BurnableUpgradeable.sol";

// TODO update name
library SocialTokenConstants {
    uint256 public constant totalSupply = 10000000 ether;
    // TODO add percentages for distribution
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
