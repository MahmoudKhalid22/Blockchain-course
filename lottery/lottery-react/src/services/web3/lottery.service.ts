import { ethers } from "ethers";
import type { Contract } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../../config";
import type { Web3Provider } from "@ethersproject/providers";

export class LotteryService {
  private contract: Contract;

  constructor(signerOrProvider: any) {
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signerOrProvider
    );
  }

  async getManager(): Promise<string> {
    return await this.contract.manager();
  }

  async getPlayers(): Promise<string[]> {
    return await this.contract.getPlayers();
  }

  async getPlayersCount(): Promise<number> {
    return await this.contract.getPlayersCount();
  }

  async getContractBalance(provider: Web3Provider): Promise<string> {
    return (await provider.getBalance(CONTRACT_ADDRESS)).toString();
  }

  async enterGame(amount: number): Promise<void> {
    const tx = await this.contract.enter({
      value: ethers.parseEther(amount.toString()),
    });
    // await tx.wait(); // Wait for transaction confirmation
    return tx;
  }

  async pickWinner() {
    // if (!(this.contract.signer instanceof JsonRpcSigner)) {
    //   throw new Error("Contract is not connected to a signer");
    // }
    const tx = await this.contract.pickWinner();
    await tx.wait(); // Wait for transaction confirmation
    return this.getWinner();
  }

  getContract(): Contract {
    return this.contract;
  }
  async getWinner(): Promise<string> {
    return await this.contract.getLastWinner();
  }
}
