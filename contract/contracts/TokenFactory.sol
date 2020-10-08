pragma solidity ^0.6.0;

import "./interfaces.sol";

contract TokenFactory is TokenFactoryInterface {

    function totalTokenCount() public view override returns (uint256) {
        return 0;
    }

    function tokenOf(uint256 id) public view override returns (address) {
        return address(0);
    }

    function tokenAmountOf(address creator) public view override returns (uint256) {
        return 0;
    }

    function creatorTokenOf(address creator, uint256 id) public view override returns (address) {
        return address(0);
    }

    function createToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals,
        uint8 ratio,
        bool isTotalSupplyFixed,
        uint8 lockupPeriod, // years
        bool enableStakeToToken
    ) public override returns(address) {
        return address(0);
    }
}
