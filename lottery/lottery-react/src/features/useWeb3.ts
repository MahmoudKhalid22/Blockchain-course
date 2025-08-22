import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useState } from "react";
import { ABI, CONTRACT_ADDRESS } from "../config";
import { Contract } from "ethers";
import type { JsonRpcSigner } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function useWeb3() {
  const [userAccount, setUserAccount] = useState<string>("");
  const [lotteryContractInstance, setLotteryContractInstance] =
    useState<Contract | null>(null);
  const [manager, setManager] = useState("");
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | any>(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3Provider = new Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        const signerInstance = web3Provider.getSigner();
        const accounts = await web3Provider.listAccounts();
        console.log(
          "web3 provider,=========== ",
          web3Provider,
          "signer instance: ============",
          signerInstance,
          "user account:============== ",
          userAccount
        );
        setProvider(web3Provider);
        setSigner(signerInstance);
        setUserAccount(accounts[0]);
      } else {
        console.log("Please install MetaMask");
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Check console for details.");
    }
  };

  const connectToLotteryContract = async () => {
    try {
      if (!provider && !signer) {
        throw new Error(
          "Provider or signer not initialized. Connect wallet first."
        );
      }
      // Use signer for state-changing calls, or provider for read-only calls
      const lotteryContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer || provider
      );
      console.log("lottery contract: ============>", lotteryContract);
      setLotteryContractInstance(lotteryContract);
    } catch (error) {
      console.error("Failed to connect to lottery contract:", error);
      alert("Failed to connect to contract. Check console for details.");
    }
  };

  const getManager = async () => {
    try {
      if (!lotteryContractInstance) {
        throw new Error(
          "Lottery contract not initialized. Connect to contract first."
        );
      }
      const managerAddress = await lotteryContractInstance.manager();
      setManager(managerAddress);
    } catch (error) {
      console.error("Failed to get manager:", error);
      alert("Failed to get manager. Check console for details.");
    }
  };

  return {
    connectWallet,
    userAccount,
    connectToLotteryContract,
    getManager,
    manager,
  };
}

export default useWeb3;
