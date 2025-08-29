import type { Web3Provider } from "@ethersproject/providers";
import type { Contract } from "ethers";
import type { JsonRpcSigner } from "ethers";

export interface Web3State {
  provider: Web3Provider | null;
  signer: JsonRpcSigner | null;
  userAccount: string;
  isConnected: boolean;
  isConnecting: boolean;
}

export interface LotteryState {
  contract: Contract | null;
  manager: string;
  players: string[];
  playersCount: number;
  lastWinner: string;
  balance: string;
  isLoading: boolean;
}
