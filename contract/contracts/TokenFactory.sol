pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";

contract TokenFactory is TokenFactoryInterface {
    using SafeMath for uint256;

    uint256 public override totalTokenCount = 0;

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
        FanToken newToken = new FanToken(name, symbol, totalSupply, creator, decimals);
        address tokenAddress = address(newToken);
        totalTokenCount = totalTokenCount.add(1);
        return tokenAddress;
    }
}
