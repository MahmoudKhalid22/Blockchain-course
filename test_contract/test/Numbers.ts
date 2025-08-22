import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Number", function () {
  it("Should get array", async function () {
    const numbers = await ethers.deployContract("Numbers");

    expect(await numbers.getArrayLength()).to.equal("3");
  });

  it("get array element", async function () {
    const numbers = await ethers.deployContract("Numbers");
    // const deploymentBlockNumber = await ethers.provider.getBlockNumber();

    // run a series of increments

    expect((await numbers.getArrayElement(2)).toLowerCase()).to.equal("samra");

    // check that the aggregated events match the current value
  });
});
