import { useEffect, useState } from "react";
import CartWidget from "./CartWidget";
import { NavLink } from "react-router-dom";
import { db } from "./database";
import { collection, getDocs } from "firebase/firestore";
import "boxicons";

const NavBar = () => {
  const [cat, setCat] = useState([]);
  const [nav, setNav] = useState(false);
  const handelNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    const productosCollection = collection(db, "productos");
    const getItem = getDocs(productosCollection);
    getItem
      .then((resultado) => {
        const e = [];
        resultado.docs.map((doc) => {
          e.push(doc.data().categoria);
          const arrayDuplicados = new Set(e);
          const arryFiltrados = [...arrayDuplicados];
          setCat(arryFiltrados);
          return arryFiltrados;
        });
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  return (
    <>
      <div className="flex-1"></div>
      <nav className="hidden md:flex gap-x-5 text-white font-bold text-lg">
        {cat.map((e) => {
          return (
            <NavLink
              className="hover:text-blue-800 [&.active]:text-yellow-200"
              key={e}
              to={`../productos/${e}`}
            >
              {e.toUpperCase()}
            </NavLink>
          );
        })}
      </nav>
      <div className="flex-1"></div>
      <CartWidget />
      <span
        onClick={() => handelNav()}
        className="material-symbols-outlined text-white cursor-pointer"
      >
        menu
      </span>
      <div
        className={`fixed top-0 ${
          nav ? "right-0 backdrop-blur-lg" : "-right-[100%]"
        } w-full h-full bg-white/10 z-50 p-5 transition-all duration-150 ease-in-out delay-200`}
      ></div>
      <div
        className={`fixed top-0 ${
          nav ? "right-0" : "-right-[100%]"
        } w-[80%] h-full bg-blue-500 z-50 p-5 transition-all duration-150 ease-in-out delay-100`}
      >
        <div className="text-right h-full">
          <span
            onClick={() => handelNav()}
            className=" cursor-pointer material-symbols-outlined text-white"
          >
            close
          </span>
          <nav className="h-100 pt-20 flex flex-col md:hidden gap-x-5 text-white font-bold text-lg justify-center">
            <NavLink
              onClick={() => handelNav()}
              to="/"
              className="hover:text-blue-800 [&.active]:text-yellow-200 mb-4 text-3xl"
            >
              INICIO
            </NavLink>
            {cat.map((e) => {
              return (
                <NavLink
                  onClick={() => handelNav()}
                  className="hover:text-blue-800 [&.active]:text-yellow-200 text-3xl"
                  key={e}
                  to={`../productos/${e}`}
                >
                  {e.toUpperCase()}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};
export default NavBar;
