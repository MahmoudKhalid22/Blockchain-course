import { Outlet } from "react-router-dom";
import Navbar from "../features/home/Navbar";

function Wrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Wrapper;
