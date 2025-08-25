import { useEffect } from "react";
import useWeb3 from "../useWeb3";

function GameComponent() {
  const {
    getPlayersNumber,
    playersCount,
    players,
    getPlayers,
    balance,
    getManager,
    manager,
    connectWallet,
    connectToLotteryContract,
  } = useWeb3();
  useEffect(() => {
    getPlayersNumber();
    getPlayers();
    getManager();
    connectWallet();
    connectToLotteryContract();
  });
  // console.log("players count: ", playersCount);
  return (
    <div>
      <p>this contract is manage by {manager}</p>
      {+playersCount > 0 && <p>Number of Players {playersCount}</p>}
      <p>{players.length === 0 && "No players entered the game"}</p>
      {balance && <p>Balance of the contract: {balance}</p>}
      {players &&
        players?.map((player) => (
          <div>
            <p>player: </p>
            <p>{player}</p>
          </div>
        ))}
    </div>
  );
}

export default GameComponent;
