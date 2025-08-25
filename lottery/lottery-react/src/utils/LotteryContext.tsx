import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { LotteryState } from "../model/web3.types";

type LotteryAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CONTRACT"; payload: any }
  | { type: "SET_MANAGER"; payload: string }
  | { type: "SET_PLAYERS"; payload: string[] }
  | { type: "SET_PLAYERS_COUNT"; payload: number }
  | { type: "SET_BALANCE"; payload: string }
  | { type: "RESET" };

const initialState: LotteryState = {
  contract: null,
  manager: "",
  players: [],
  playersCount: 0,
  balance: "0",
  isLoading: false,
};

function lotteryReducer(
  state: LotteryState,
  action: LotteryAction
): LotteryState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_CONTRACT":
      return { ...state, contract: action.payload };
    case "SET_MANAGER":
      return { ...state, manager: action.payload };
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "SET_PLAYERS_COUNT":
      return { ...state, playersCount: action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const LotteryContext = createContext<{
  state: LotteryState;
  dispatch: React.Dispatch<LotteryAction>;
} | null>(null);

export function LotteryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(lotteryReducer, initialState);

  return (
    <LotteryContext.Provider value={{ state, dispatch }}>
      {children}
    </LotteryContext.Provider>
  );
}

export function useLotteryContext() {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error("useLotteryContext must be used within LotteryProvider");
  }
  return context;
}
