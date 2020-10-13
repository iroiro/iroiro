pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";

contract TokenFactory is TokenFactoryInterface {
    using SafeMath for uint256;

    // TODO define event

    mapping(uint256 => address) private tokens;
    mapping(address => uint256) private tokenAmountOfCreators;
    mapping(address => mapping(uint256 => address)) private tokensOfCreators;

    uint256 private totalCount = 0;
    address private vesting;
    address private stakingPool;

    constructor(address _vesting, address _stakingPool) public {
        vesting = _vesting;
        stakingPool = _stakingPool;
    }

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
        return tokensOfCreators[creator][id];
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
    ) external override returns (address) {
        require(ratio <= 100, "Ratio must be a number between 0 and 100");
        // TODO register token to staking token list
        address tokenAddress;
        {// To avoid stack too deep
            FanToken newToken = new FanToken(name, symbol, totalSupply, payable(address(this)), decimals, stakingPool);
            tokenAddress = address(newToken);
            newToken.transfer(vesting, totalSupply.mul(ratio).div(100));
            // Tokens for fans is currently transferred to creator. Distributed by other ways in the future
            newToken.transfer(creator, totalSupply.mul(uint256(100).sub(ratio)).div(100));
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
