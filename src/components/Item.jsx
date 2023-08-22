import { useNavigate } from "react-router-dom";
import "animate.css";
const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

const Item = ({ producto, i }) => {
  const navDetalle = useNavigate();
  const elegirDetalle = () => {
    navDetalle(`/producto/${producto.id}`);
  };
  return (
    <>
      <article className="group p-2 animate__animated animate__fadeIn animate__faster rounded-sm overflow-hidden bg-white">
        <div className="border-b-2 h-80 flex justify-center overflow-hidden">
          <img
            src={producto.url}
            alt={producto.nombre}
            className="h-full group-hover:scale-125 transition-all duration-200 ease-out"
          />
        </div>
        <div className="flex mt-2 z-10">
          <span className="text-xl text-slate-700">
            {formatter.format(producto.precio)}
          </span>
          <span className="article__icon material-symbols-outlined ml-auto">
            favorite
          </span>
        </div>
        <button
          onClick={elegirDetalle}
          className="mt-2 text-center text-white font-bold w-full bg-blue-500 hover:bg-blue-700 rounded-sm py-1 "
        >
          DETALLE
        </button>
        <div className="mt-2">
          <h3 className=" text-slate-700 font-semibold leading-5">
            {producto.nombre}
          </h3>
        </div>
      </article>
    </>
  );
};
export default Item;
