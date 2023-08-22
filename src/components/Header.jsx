import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="bg-blue-500 h-20 p-3">
        <div className="h-full container mx-auto px-4 flex place-items-center place-content-center justify-between gap-x-3">
          <NavLink to="/">
            <span className="w-32 flex justify-center items-center">
              <img className="w-full" src="/img/logo-egotech.svg" alt="" />
            </span>
          </NavLink>
          <NavBar />
        </div>
      </header>
    </>
  );
};

export default Header;
