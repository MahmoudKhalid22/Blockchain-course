import { Outlet } from "react-router-dom";
import Navbar from "../features/home/Navbar";

function Wrapper() {
  return (
    <div className="flex flex-col gap-0 h-screen">
      <div className="">
        <Navbar />
      </div>
      <div className=" h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Wrapper;
