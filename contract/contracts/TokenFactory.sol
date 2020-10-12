pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";

contract TokenFactory is TokenFactoryInterface {
    using SafeMath for uint256;

    mapping(uint256 => address) private tokens;
    mapping(address => uint256) private tokenAmountOfCreators;
    mapping(address => mapping(uint256 => address)) private tokensOfCreators;

    uint256 private totalCount = 0;

    function totalTokenCount() public view override returns (uint256) {
        return totalCount;
    }

    function tokenOf(uint256 id) public view override returns (address) {
        return tokens[id];
    }

    function tokenAmountOf(address creator) public view override returns (uint256) {
        return tokenAmountOfCreators[creator];
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
        uint8 ratio, // TODO update name more explicitly
        bool isTotalSupplyFixed,
        uint8 lockupPeriod, // years
        bool enableStakeToToken
    ) public override returns (address) {
        // TODO Validate ratio is between 0 and 100
        address tokenAddress;
        { // To avoid stack too deep
            FanToken newToken = new FanToken(name, symbol, totalSupply, payable(address(this)), decimals);
            tokenAddress = address(newToken);
            // TODO: Send token to vesting contract(for creator) and creator(for distribution to fans) depend on ratio
            newToken.transfer(creator, totalSupply);
        }
        {
            uint256 nextTokenId = totalCount.add(1);
            totalCount = nextTokenId;
            tokens[nextTokenId] = tokenAddress;
        }
        {
            uint256 nextCreatorTokenId = tokenAmountOfCreators[creator].add(1);
            tokenAmountOfCreators[creator] = nextCreatorTokenId;
            tokensOfCreators[creator][nextCreatorTokenId] = tokenAddress;
        }

        return tokenAddress;
    }
}
