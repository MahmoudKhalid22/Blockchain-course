import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { Web3State } from "../types/web3.types";

type Web3Action =
  | { type: "CONNECT_START" }
  | {
      type: "CONNECT_SUCCESS";
      payload: { provider: any; signer: any; account: string };
    }
  | { type: "CONNECT_ERROR" }
  | { type: "DISCONNECT" };

const initialState: Web3State = {
  provider: null,
  signer: null,
  userAccount: "",
  isConnected: false,
  isConnecting: false,
};

function web3Reducer(state: Web3State, action: Web3Action): Web3State {
  switch (action.type) {
    case "CONNECT_START":
      return { ...state, isConnecting: true };
    case "CONNECT_SUCCESS":
      return {
        ...state,
        provider: action.payload.provider,
        signer: action.payload.signer,
        userAccount: action.payload.account,
        isConnected: true,
        isConnecting: false,
      };
    case "CONNECT_ERROR":
      return { ...state, isConnecting: false };
    case "DISCONNECT":
      return initialState;
    default:
      return state;
  }
}

const Web3Context = createContext<{
  state: Web3State;
  dispatch: React.Dispatch<Web3Action>;
} | null>(null);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(web3Reducer, initialState);

  return (
    <Web3Context.Provider value={{ state, dispatch }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3Context() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be used within Web3Provider");
  }
  return context;
}
