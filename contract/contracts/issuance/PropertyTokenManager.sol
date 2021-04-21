pragma solidity =0.7.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@devprotocol/protocol/contracts/interface/IAddressConfig.sol";
import "@devprotocol/protocol/contracts/interface/IWithdraw.sol";
import "../interfaces/PropertyTokenManagerInterface.sol";
import "./SocialToken.sol";

contract PropertyTokenManager is PropertyTokenManagerInterface, Ownable {
    using SafeMath for uint256;

    mapping(address => address) communityTokenToPropertyTokenMap;

    function depositPropertyToken(
        address _communityToken,
        address _propertyToken
    // TODO consider onlyOwner is necessary
    ) external override onlyOwner {
        require(
            communityTokenToPropertyTokenMap[_communityToken] == address(0),
            "Token is already registered."
        );
        communityTokenToPropertyTokenMap[_communityToken] = _propertyToken;

        IERC20(_propertyToken)
        .transferFrom(msg.sender, address(this), SocialTokenConstants.oneTenthOfToken);
    }

    function convert(
        address _communityToken,
        uint256 _communityTokenAmount
    ) external override {
        IERC20 propertyToken = IERC20(address(communityTokenToPropertyTokenMap[_communityToken]));
        IERC20 communityToken = IERC20(_communityToken);

        communityToken.transferFrom(msg.sender, address(this), _communityTokenAmount);

        // TODO test calculation is correct
        uint256 propertyTokenAmount = _communityTokenAmount.div(10); // amount * tenth of token / total supply
        propertyToken.transfer(msg.sender, propertyTokenAmount);
    }

    function rescue(address _erc20, address _target) external override onlyOwner {
        uint256 balance = IERC20(_erc20).balanceOf(address(this));
        IERC20(_erc20).transfer(_target, balance);
    }
}
