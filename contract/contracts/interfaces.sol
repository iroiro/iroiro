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

interface Vesting {

    function addVesting(
        address token,
        address recipient,
        uint256 vestingStart,
        uint256 vestingEnd
    ) external;

    // transfer available tokens to creator
    function redeem() external;
}

interface AudiusInterface {
    // Add Audius list
    function addAudiusList(address creator, address token) external;

    // Get the amount of tokens distributed
    function distributedAmount(address token) external view returns (uint256);

    // Claim tokens
    function claim(address token) external;
}