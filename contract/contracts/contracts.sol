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
        string name,
        string symbol,
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
    function earned() external returns(uint256);

    // stake user tokens
    function stake(uint256 amount) external returns();

    // withdraw user tokens
    function withdraw(uint256 amount) external returns();

    // claim new tokens
    function claim() external;
}

interface Vesting {
    // transfer available tokens to creator
    function claim() external returns();
}
