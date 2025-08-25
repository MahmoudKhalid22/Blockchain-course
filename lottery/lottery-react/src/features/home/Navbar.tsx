import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-12 py-2 bg-[#1E90FF]">
      <Link to={"/"}>
        <img src="/logo.png" alt="game logo" />
      </Link>
      <ul className="flex items-center gap-4">
        <li className="text-xl">
          <NavLink to={"/"}>HOME</NavLink>
        </li>
        <li className="text-xl">
          <NavLink to={"/game"}>GAME</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
