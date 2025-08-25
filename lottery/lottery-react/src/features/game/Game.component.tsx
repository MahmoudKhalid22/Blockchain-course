import { ethers } from "ethers";
import { useWallet } from "../useWallet";
import { useLottery } from "../useLottery";
import { useState } from "react";

function GameComponent() {
  const { isConnected, userAccount, connectWallet } = useWallet();
  const { manager, players, balance, enterGame, isLoading } = useLottery();
  const [entryAmount, setEntryAmount] = useState("0.1");

  const handleEnterGame = async () => {
    try {
      await enterGame(+entryAmount);
      alert("Successfully entered the lottery!");
    } catch (error: any) {
      alert(`Failed to enter game: ${error.message}`);
    }
  };

  if (!isConnected) {
    return (
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Lottery Dashboard</h1>
      <p>Your Account: {userAccount}</p>
      <p>Manager: {manager}</p>
      <p>Players: {players.length}</p>
      <p>Balance: {ethers.formatEther(balance || "0")} ETH</p>

      <div>
        <input
          type="number"
          step="0.01"
          min="0"
          value={entryAmount}
          onChange={(e) => setEntryAmount(e.target.value)}
          placeholder="Amount in ETH"
        />
        <button onClick={handleEnterGame} disabled={isLoading}>
          {isLoading ? "Processing..." : `Enter Game (${entryAmount} ETH)`}
        </button>
      </div>
    </div>
  );
}

export default GameComponent;
