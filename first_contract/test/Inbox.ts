import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

const INITIAL_MESSAGE = "Hi there!";

describe("Inbox", () => {
  let inbox: any;
  it("should start the contract", async () => {
    inbox = await ethers.deployContract("Inbox", [INITIAL_MESSAGE]);
    expect(await inbox.message()).to.equal(INITIAL_MESSAGE);
  });

  it("should get the message", async () => {
    expect(await inbox.message()).to.equal(INITIAL_MESSAGE);
  });

  it("should set the message", async () => {
    await inbox.setMessage("Hello, world!");
    expect(await inbox.message()).to.equal("Hello, world!");
  });
});
