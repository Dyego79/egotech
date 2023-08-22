import { Link } from "react-router-dom";
import { useContext } from "react";
import { contexto } from "./CartContext";
import "animate.css";

const CartWidget = () => {
  const { productquantity } = useContext(contexto);

  return (
    <>
      <div className="relative flex">
        <Link to="/Cart">
          <div className="">
            <span className="material-symbols-outlined text-white text-3xl">
              shopping_cart
            </span>
          </div>
        </Link>
        {productquantity !== 0 ? (
          <div className="absolute -top-2 -right-2 rounded-full bg-gray-50 flex justify-center items-center w-5 h-5">
            <span>{productquantity}</span>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default CartWidget;
