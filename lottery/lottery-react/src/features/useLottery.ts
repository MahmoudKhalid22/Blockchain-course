import { useCallback, useEffect } from "react";
import { useLotteryContext } from "../utils/LotteryContext";
import { useWeb3Context } from "../utils/Web3Context";
import { LotteryService } from "../services/web3/lottery.service";

export function useLottery() {
  const { state: lotteryState, dispatch } = useLotteryContext();
  const { state: web3State } = useWeb3Context();

  const initializeContract = useCallback(async () => {
    if (!web3State.signer && !web3State.provider) {
      throw new Error("Web3 not connected");
    }

    const lotteryService = new LotteryService(
      web3State.signer || web3State.provider!
    );
    const contract = lotteryService.getContract();

    dispatch({ type: "SET_CONTRACT", payload: contract });
    return lotteryService;
  }, [web3State.signer, web3State.provider, dispatch]);

  const loadLotteryData = useCallback(async () => {
    if (!web3State.provider) return;

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const lotteryService = new LotteryService(web3State.provider);

      const [manager, playersCount, balance] = await Promise.all([
        lotteryService.getManager(),
        // lotteryService.getPlayers(),
        lotteryService.getPlayersCount(),
        // lotteryService.getWinner(),
        lotteryService.getContractBalance(web3State.provider),
      ]);

      // console.log("players count: ", parseInt(playersCount as number));

      dispatch({ type: "SET_MANAGER", payload: manager });
      // dispatch({ type: "SET_PLAYERS", payload: players });
      dispatch({ type: "SET_PLAYERS_COUNT", payload: playersCount });
      // dispatch({ type: "SET_LAST_WINNER", payload: lastWinner });
      dispatch({ type: "SET_BALANCE", payload: balance });
    } catch (error) {
      console.error("Failed to load lottery data:", error);
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [web3State.provider, dispatch]);

  const enterGame = useCallback(
    async (amount: number) => {
      if (!web3State.signer) {
        throw new Error("Wallet not connected");
      }

      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const lotteryService = new LotteryService(web3State.signer);
        await lotteryService.enterGame(amount);

        // Reload data after entering
        await loadLotteryData();
      } catch (error) {
        console.error("Failed to enter game:", error);
        throw error;
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [web3State.signer, loadLotteryData, dispatch]
  );

  // Auto-load data when provider is available
  useEffect(() => {
    if (web3State.provider) {
      loadLotteryData();
    }
  }, [web3State.provider, loadLotteryData]);

  const pickWinner = useCallback(async () => {
    if (!web3State.signer) {
      throw new Error("Wallet not connected");
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const lotteryService = new LotteryService(web3State.signer);
      const winner = await lotteryService.pickWinner();
      // console.log("Winner picked: ", winner);
      dispatch({ type: "SET_LAST_WINNER", payload: winner }); // خزن في state

      // Refresh state after winner picked
      await loadLotteryData();
    } catch (error) {
      console.error("Failed to pick winner:", error);
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [web3State.signer, loadLotteryData, dispatch]);

  return {
    ...lotteryState,
    initializeContract,
    loadLotteryData,
    enterGame,
    pickWinner,
  };
}
