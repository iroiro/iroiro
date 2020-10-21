// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

interface TokenFactoryInterface {
    // Get created token count
    function totalTokenCount() external view returns (uint256);

    // Get token address by index
    function tokenOf(uint256 id) external view returns (address);

    // get token amount of creator
    function tokenAmountOf(address creator) external view returns (uint256);

    // get a creator token of specific id
    function creatorTokenOf(address creator, uint256 id) external view returns (address);

    // Create new creator token, and then transfer tokens to owner and vesting contract
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
    ) external returns (address);
}

// contract ABCToken is ERC20 {}

interface PoolInterface {
    // Add staking list
    function addStakingList(address creator, address token, bool paused) external;

    // Get available token amount
    // totalSupply and decimals are possibly removed
    function earned(address account, address token, uint256 totalSupply, uint8 decimals) external view returns (uint256);

    // stake user tokens
    function stake(uint256 amount, address token) external;

    // withdraw user tokens
    function withdraw(uint256 amount, address token) external;

    // claim new tokens
    function claim(address token) external;
}

interface VestingInterface {

    function addVesting(
        address token,
        address recipient,
        uint256 vestingStart,
        uint256 vestingEnd
    ) external;

    // transfer available tokens to creator
    function redeem(address token) external;
}

interface AudiusInterface {
    function isClaimable(address token) external view returns (bool);

    // Add Audius list
    function addAudiusList(uint256 id, string memory _followersHash, uint256 _followersNum) external;

    // Get the amount of tokens distributed
    function distributedAmount(address token) external view returns (uint256);

    // Claim tokens
    function claim(address token) external;

    // Request Checking Address to Chainlink
    function requestCheckingAddress(
        address _oracle, // which Audius contract requests
        bytes32 _jobId, // which checking address external adapter contained
        string memory _cid, // hash id for address list JSON stored on IPFS
        string memory tokenAddress, // which user want to claim, necessary for Chainlink request
        string memory userAddress, // same as msg.sender but necessary for Chainlink request
        address token, // which used for getting token id
        uint256 fee // $LINK fee with 18 decimals
    ) external returns (bytes32 requestId);
}
