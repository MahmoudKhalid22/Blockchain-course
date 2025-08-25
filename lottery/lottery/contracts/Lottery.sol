// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }


    function enter() public payable {
        require(msg.value > .01 ether, "Minimum entry fee is 0.01 ether");
        players.push(msg.sender);
    }

    function random() private view returns (uint){
       uint randomNumber =  uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
       return randomNumber;
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");

        uint index = random() % players.length;
        address winner = players[index];
        
        payable(winner).transfer(address(this).balance);

        players = new address[](0);
    }

    function getPlayersCount() public view returns (uint) {
        return players.length;
    }
   function getPlayers() public view returns (address[] memory) {
    return players;
}

    modifier restricted() {
            require(msg.sender == manager, "Only the manager can pick a winner");
        _;
    }



}