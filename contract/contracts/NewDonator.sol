// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./NewInterfaces.sol";

contract NewDonator is DonatorInterface {
    // TODO This function should be restricted for authenticated token owners
    function setDonatee(address _token) public override {
        tokenDonateeList[_token] = msg.sender;
    }

    function donate(address _token, uint256 _amount) public override {
        address donatee = tokenDonateeList[_token];
        require(donatee != address(0), "Donatee is not registered yet");
        ERC20 token = ERC20(_token);
        token.transferFrom(msg.sender, donatee, _amount);

        emit Donate(
            msg.sender,
            donatee,
            _token,
            _amount
        );
    }
}