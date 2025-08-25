import { Web3Provider } from "@ethersproject/providers";

export class WalletService {
  static async connectWallet(): Promise<{
    provider: Web3Provider;
    signer: any;
    account: string;
  }> {
    if (!window.ethereum) {
      throw new Error("Please install Metamask!");
    }

    const provider = new Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const accounts = await provider.listAccounts();

    return {
      provider,
      signer,
      account: accounts[0],
    };
  }

  static async getBalance(
    provider: Web3Provider,
    address: string
  ): Promise<string> {
    const balance = await provider.getBalance(address);
    return balance.toString();
  }
}
