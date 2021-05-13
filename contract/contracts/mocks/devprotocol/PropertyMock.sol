// SPDX-License-Identifier: MIT

pragma solidity =0.7.6;

import "@devprotocol/protocol/contracts/interface/IProperty.sol";

contract PropertyMock is IProperty {
    function author() external override view returns (address) {}

    function changeAuthor(address _nextAuthor) external override {}

    function changeName(string calldata _name) external override {}

    function changeSymbol(string calldata _symbol) external override {}

    function withdraw(address _sender, uint256 _value) external override {}
}
