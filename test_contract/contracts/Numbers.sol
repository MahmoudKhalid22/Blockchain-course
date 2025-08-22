// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Numbers {
  string[] public numbers;
  constructor() {
    numbers.push("mahmoud");
    numbers.push("Khalid");
    numbers.push("Samra");
  }

  function getArray() public view returns(string[] memory) {
    return numbers;
  }

  function getArrayLength() public view returns(uint){
    return numbers.length;
  }

  function getArrayElement(uint index) public view returns(string memory) {
    require(index < numbers.length, "Index out of bounds");
    return numbers[index];
  }
}
