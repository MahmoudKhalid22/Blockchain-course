import { Link } from "react-router-dom";

function HomeComponent() {
  return (
    <div className="h-full">
      <div className="container"></div>
      <div className="flex items-center justify-center w-full h-full p-12">
        <div className="flex flex-col gap-16 justify-center h-full">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-white">Web3 Lottery</h2>
            <p className="text-2xl font-light text-white w-3/4">
              Join the decentralized prize pool. Enter now!
            </p>
          </div>
          <Link
            to={"/game"}
            className="text-center transition-colors duration-300 cursor-pointer hover:bg-[#54198c] bg-[#5D1C9B] py-3 rounded-lg text-white w-[25rem] text-2xl font-semibold"
          >
            TRY YOUR LUCK
          </Link>
        </div>
        <div className="">
          <img src="/heroImage.png" alt="hero" className="h-[25rem]" />
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
