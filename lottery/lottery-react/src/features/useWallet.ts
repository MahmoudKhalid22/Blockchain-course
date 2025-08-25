import { useCallback } from "react";
import { useWeb3Context } from "../utils/Web3Context";
import { WalletService } from "../services/web3/wellet.service";

export function useWallet() {
  const { state, dispatch } = useWeb3Context();

  const connectWallet = useCallback(async () => {
    try {
      dispatch({ type: "CONNECT_START" });
      const { provider, signer, account } = await WalletService.connectWallet();

      dispatch({
        type: "CONNECT_SUCCESS",
        payload: { provider, signer, account },
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      dispatch({ type: "CONNECT_ERROR" });
      throw error;
    }
  }, [dispatch]);

  const disconnect = useCallback(() => {
    dispatch({ type: "DISCONNECT" });
  }, [dispatch]);

  return {
    ...state,
    connectWallet,
    disconnect,
  };
}
