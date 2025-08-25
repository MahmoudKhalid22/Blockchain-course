import { ethers, type JsonRpcSigner } from "ethers";
import type { Contract } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../../config";
import type { ContractRunner } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";

export class LotteryService {
  private contract: Contract;

  constructor(signerOrProvider: ContractRunner) {
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
    console.log("amount to bc: ", amount);
    const tx = await this.contract.enter({
      value: ethers.parseEther(amount.toString()),
    });
    await tx.wait(); // Wait for transaction confirmation
  }

  getContract(): Contract {
    return this.contract;
  }
}
