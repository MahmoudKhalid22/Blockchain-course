import useWeb3 from "../useWeb3";

function HomeComponent() {
  const { connectWallet, userAccount } = useWeb3();
  return (
    <div className="flex items-start justify-center gap-12 py-6 px-6 w-full">
      <div className="flex flex-col items-start gap-12 py-12">
        <h2 className="text-4xl font-bold">Web3 Lottery</h2>
        <p className="text-2xl font-light">
          Join the decentralized prize pool. Enter now!
        </p>
        <button
          onClick={connectWallet}
          className="uppercase text-3xl font-bold bg-[#1e90ff] w-full py-3 cursor-pointer rounded-xl transition-colors hover:bg-[#1b82e6]"
        >
          {userAccount
            ? userAccount.slice(0, 4) + "..." + userAccount.slice(-4)
            : "connect wallet"}
        </button>
        {userAccount && (
          <button
            onClick={connectWallet}
            className="uppercase text-3xl font-bold bg-[#1e90ff] w-full py-3 cursor-pointer rounded-xl transition-colors hover:bg-[#1b82e6]"
          >
            Enter
          </button>
        )}
      </div>
      <div className="flex justify-end">
        <img src="/heroImage.png" alt="hero" className="w-3/4 h-3/4" />
      </div>
    </div>
  );
}

export default HomeComponent;
