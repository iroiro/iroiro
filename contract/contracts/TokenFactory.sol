// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "./interfaces.sol";
import "./FanToken.sol";
import "./StakingPool.sol";

contract TokenFactory is TokenFactoryInterface {
    using SafeMath for uint256;

    event CreateToken (
        address indexed token,
        address indexed creator,
        string name,
        string symbol,
        uint256 totalSupply,
        uint8 decimals,
        uint8 creatorTokenRatio,
        bool isTotalSupplyFixed,
        uint8 lockupPeriod,
        bool enableStakeToToken
    );

    mapping(uint256 => address) private tokens;
    mapping(address => uint256) private tokenAmountOfCreators;
    mapping(address => mapping(uint256 => address)) private tokensOfCreators;

    uint256 private totalCount = 0;
    Vesting private vesting;
    StakingPool private stakingPool;

    constructor(address _vesting, address _stakingPool) public {
        vesting = Vesting(_vesting);
        stakingPool = StakingPool(_stakingPool);
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
        uint8 creatorTokenRatio,
        bool isTotalSupplyFixed,
        uint8 lockupPeriod, // years
        bool enableStakeToToken
    ) external override returns (address) {
        require(creatorTokenRatio <= 100, "Ratio must be a number between 0 and 100");
        require(totalSupply > 10, "Total supply is too small");
        // TODO register token to staking token list
        FanToken newToken = new FanToken(
            name,
            symbol,
            totalSupply,
            payable(address(this)),
            decimals,
            address(stakingPool),
            creatorTokenRatio,
            lockupPeriod
        );
        {// To avoid stack too deep
            newToken.transfer(address(vesting), totalSupply.mul(creatorTokenRatio).div(100));
            // Tokens for fans is currently transferred to creator. Distributed by other ways in the future
            newToken.transfer(creator, totalSupply.sub(totalSupply.mul(creatorTokenRatio).div(100)));
            vesting.addVesting(
                address(newToken),
                creator,
                block.timestamp,
                block.timestamp.add(uint256(lockupPeriod).mul(365 days))
            );
            stakingPool.addStakingList(creator, address(newToken), !enableStakeToToken);
        }
        {
            uint256 nextTokenId = totalCount.add(1);
            totalCount = nextTokenId;
            tokens[nextTokenId] = address(newToken);
        }
        {
            uint256 nextCreatorTokenId = tokenAmountOfCreators[creator].add(1);
            tokenAmountOfCreators[creator] = nextCreatorTokenId;
            tokensOfCreators[creator][nextCreatorTokenId] = address(newToken);
        }

        emit CreateToken(
            address(newToken),
            creator,
            name,
            symbol,
            totalSupply,
            decimals,
            creatorTokenRatio,
            isTotalSupplyFixed,
            lockupPeriod,
            enableStakeToToken
        );
        return address(newToken);
    }
}
