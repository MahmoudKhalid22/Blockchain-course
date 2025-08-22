import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";
import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Lottery Contract", function () {
  let Lottery;
  let lottery: any;
  let owner: HardhatEthersSigner;
  let player1: HardhatEthersSigner;
  let player2: HardhatEthersSigner;
  let player3: HardhatEthersSigner;

  beforeEach(async function () {
    // Deploy the contract and get the signers
    [owner, player1, player2, player3] = await ethers.getSigners();
    Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy();
  });

  it("Should allow players to enter the lottery with enough Ether", async function () {
    await lottery.connect(player1).enter({ value: ethers.parseEther("0.02") });

    const playersLength = await lottery.getPlayersCount();
    expect(playersLength).to.equal(1);

    const playerAddress = await lottery.players(0);
    expect(playerAddress).to.equal(player1.address);
  });

  it("Should only allow the manager to pick the winner", async function () {
    await lottery.connect(player1).enter({ value: ethers.parseEther("0.02") });
    await lottery.connect(player2).enter({ value: ethers.parseEther("0.02") });

    const playerLength = await lottery.getPlayersCount();
    expect(playerLength).to.equal(2);

    await expect(lottery.connect(player1).pickWinner()).to.be.revertedWith(
      "Only the manager can pick a winner"
    );

    const initialBalance = await ethers.provider.getBalance(player1.address);
    console.log("initial balance for player 1: ", initialBalance);
    await lottery.connect(owner).pickWinner();

    const finalBalance = await ethers.provider.getBalance(player1.address);
    console.log("final balance: ", finalBalance);
    expect(finalBalance).to.be.above(initialBalance);

    const playersLength = await lottery.players.length;
    expect(playersLength).to.equal(0);
  });

  it("Should revert if no players are in the lottery when picking a winner", async function () {
    await expect(lottery.connect(owner).pickWinner()).to.be.revertedWith(
      "No players in the lottery"
    );
  });

  it("Should revert if the entry fee is too low", async function () {
    // Player 1 tries to enter with less than 0.01 ether (should fail)
    await expect(
      lottery.connect(player1).enter({ value: ethers.parseEther("0.005") })
    ).to.be.revertedWith("Minimum entry fee is 0.01 ether");
  });
});
