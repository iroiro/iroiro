pragma solidity ^0.6.0;

interface TokenFactoryInterface {
    // Get created token count
    function totalTokenCount() external returns(uint256);

    // Get token address by index
    function tokenOf(uint256 id) external returns(address);

    // get token amount of creator
    function tokenAmountOf(address creator) external returns(uint256);

    // get a creator token of specific id
    function creatorTokenOf(address creator, uint256 id) external returns(address);

    // Create new creator token, and then transfer tokens to owner and vesting contract
    function createToken(
        address creator,
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals,
        uint8 ratio,
        bool isMintable,
        uint8 lockupPeriod, // years
        bool enableStakeToToken
    ) external returns(address);
}

// contract ABCToken is ERC20 {}

interface PoolInterface {
    // Get available token amount
    function earned(address account, address token) external returns(uint256);

    // stake user tokens
    function stake(uint256 amount, address token) external;

    // withdraw user tokens
    function withdraw(uint256 amount, address token) external;

    // claim new tokens
    function claim(address token) external;
}

interface Vesting {
    // transfer available tokens to creator
    function claim() external;
}
