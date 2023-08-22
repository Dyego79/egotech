import { useState, useContext } from "react";
import ItemCount from "./ItemCount";
import { contexto } from "./CartContext";
const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});
const ItemDetail = ({ detalle }) => {
  const [contadorRecibido, setcontadorRecibido] = useState(1);
  const { addProductCompleto } = useContext(contexto);

  const onAdd = (cant) => {
    setcontadorRecibido(cant);
    addProductCompleto(
      {
        id: detalle.id,
        img: detalle.url,
        cant: cant,
        nom: detalle.nombre,
        precio: detalle.precio,
        total: detalle.precio * cant,
      },
      cant
    );
  };
  return (
    <>
      <section className=" text-slate-500 animate__animated animate__fadeInUp animate__faster container mx-auto px-5 bg-white grid md:grid-cols-2 mt-12 pb-20">
        <div className="flex content-center justify-center">
          <img src={detalle.url} alt="" className=" h-[500px]" />
        </div>
        <div className="flex flex-col justify-start gap-y-6 mt-6">
          <div>
            <h3 className="text-xl font-bold">{detalle.nombre}</h3>
            <span className="uppercase text-sm mr-2">Categoría: </span>
            <span className="detalle__info__catNombre">
              {detalle.categoria.toUpperCase()}
            </span>
          </div>
          <div className="text-xl">
            <span className="detalle__info__cat">Precio:</span>{" "}
            <span className="detalle__info__price">
              {formatter.format(detalle.precio)}
            </span>
          </div>
          <div className=" ">
            <div className="uppercase text-sm">Detalle:</div>{" "}
            <div className="text-lg mt-2">
              <p>{detalle.descripcion}</p>
            </div>
          </div>
          <ItemCount stock={10} initial={1} onAdd={onAdd} detalle={detalle} />
        </div>
      </section>
    </>
  );
};

export default ItemDetail;
