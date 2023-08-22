import { contexto } from "./CartContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./database";
import { collection, addDoc } from "firebase/firestore";
import "animate.css";
const { DateTime } = "luxon";

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});
const Cart = () => {
  const [fade, setFade] = useState(false);
  const [idCompra, setIdCompra] = useState("");
  const [check, setChek] = useState(false);
  const hoy = new Date();

  const {
    productquantity,
    carrito,
    eliminarProducto,
    vaciarCarrito,
    totalCarrito,
    order,
    agregarOrden,
  } = useContext(contexto);

  const comprar = () => {
    const ordenesCollection = collection(db, "ordenes");

    const orden = {
      buyer: {
        name: "Diego",
        phone: "11-5555-5555",
        email: "diego@diego.com",
      },
      items: carrito,
      date: hoy.toLocaleString(),
      total: totalCarrito,
    };

    const consulta = addDoc(ordenesCollection, orden);

    consulta
      .then((resultado) => {
        const id = resultado.id;
        setIdCompra(id);
        agregarOrden(orden, id);
        setChek(true);
        vaciarCarrito();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const elim = (id) => {
    eliminarProducto(id.target);
  };
  const fad = () => {
    setFade(!fade);
    vaciarCarrito();
  };

  return (
    <>
      {check ? (
        <section className=" text-slate-600 container mx-auto md:px-20 animate__animated animate__fadeIn animate__faster">
          <div className="p-10">
            <div className="text-center">
              <span className="material-symbols-outlined  animate__animated animate__fadeInUp animate__delay-0 text-8xl text-green-400 p-8">
                check
              </span>
            </div>
            <h2 className="text-4xl text-center text-slate-600 font-bold">
              ¡Gracias por tu compra!
            </h2>
          </div>
          <div className="md:px-20">
            <div className="flex flex-col">
              <div className="contenedorDatos__datos">
                <h3>Datos de Contacto: </h3>
              </div>
              <div className="contenedorDatos__phone">
                Tel: {order.buyer.phone}
              </div>
              <div className="contenedorDatos__email">
                e-mail: {order.buyer.email}
              </div>
              <div className="contenedorDatos__email">Fecha: {order.date}</div>
            </div>
            <div className="flex gap-2">
              <div className="">Nº PEDIDO:</div>
              <div className="">{idCompra}</div>
            </div>
            <div className="border p-3">
              <div className="flex gap-4">
                <div className="w-4/6">Producto</div>
                <div className="w-2/6">Cantidad</div>
              </div>
              {order.items.map((element, iter) => {
                return (
                  <>
                    <div className="flex gap-4">
                      <div className="w-4/6">{element.nom}</div>
                      <div className="w-2/6">{element.cant}</div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="flex gap-4">
              <div className="w-4/6">Total</div>
              <div className="w-2/6">{formatter.format(order.total)}</div>
            </div>
          </div>
        </section>
      ) : carrito.length === 0 ? (
        <section className=" text-slate-600 container mx-auto text-center p-8 mt-20 bg-white min-h-[50vh] flex flex-col justify-center gap-20">
          <h2 className="animate__animated animate__fadeInUp animate__faster uppercase text-3xl">
            Tu carrito está vacío <span className="ml-2 text-5xl"> :(</span>
          </h2>
          <div className="flex items-center justify-center animate__animated animate__fadeIn animate__delay-0.95s">
            <Link
              to="/"
              className="flex bg-blue-600 hover:bg-blue-900 text-white p-2 rounded-md gap-x-3 uppercase"
            >
              <span className="material-symbols-outlined">
                keyboard_backspace
              </span>
              Volver a la tienda
            </Link>
          </div>
        </section>
      ) : (
        <main
          className={
            !fade
              ? "flex flex-col lg:flex-row mt-20 p-3 md:gap-x-4 md:min-h-[50vh] container mx-auto animate__animated animate__fadeInUp animate__faster bg-white"
              : "border animate__animated animate__fadeOut animate__delay-0.5"
          }
        >
          <section className="lg:w-9/12">
            <div className="md:hidden bg-slate-200 mb-5 p-2">
              DETALLE DE TU PEDIDO
            </div>
            <div className="md:flex mb-3 hidden">
              <div className="text-center w-12 text-xs">CANT</div>
              <div className="w-20 text-center text-xs">IMAGEN</div>
              <div className="flex-1 text-xs">PRODUCTO</div>
              <div className="w-16 text-center text-xs">PRECIO</div>
              <div className="w-28 text-center text-xs">PRECIO TOTAL</div>
              <div className="w-28 text-center text-xs">MODIFICAR</div>
              <div className="w-28 text-center text-xs">ELIMINAR</div>
            </div>
            {carrito.map((element) => {
              return (
                <div key={element.id} className="flex mb-10">
                  <div className="w-12  flex justify-center items-center">
                    {element.cant}
                  </div>
                  <div className="w-20 md:flex justify-center items-center hidden">
                    <img
                      src={element.img}
                      //alt={element.nom}
                      className="h-8"
                    />
                  </div>
                  <div className="flex-1  flex justify-start items-center">
                    {element.nom}
                  </div>
                  <div className="md:w-16 hidden md:flex justify-center items-center">
                    {formatter.format(element.precio)}
                  </div>
                  <div className="md:w-28 flex justify-center items-center">
                    {formatter.format(element.total)}
                  </div>
                  <div className="w-5 md:w-28 flex justify-center items-center">
                    <Link className="w-full" to={`../producto/${element.id}`}>
                      <button className="w-full">
                        <span className="material-symbols-outlined  text-green-600">
                          restart_alt
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div className="w-5 md:w-28 flex justify-center">
                    <button
                      onClick={elim}
                      id={element.id}
                      value={element.cant}
                      className="w-full"
                    >
                      <span
                        onClick={elim}
                        className="material-symbols-outlined text-red-600"
                      >
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
          <section className="lg:w-3/12 border p-2 flex flex-col  text-slate-600">
            <h2 className="font-bold bg-blue-400 text-white p-2 mb-4">
              Tu Carrito ({productquantity}) Items
            </h2>
            {carrito.map((element) => {
              return (
                <div
                  key={element.id}
                  className="flex gap-x-2 mb-2 border-b border-b-1"
                >
                  <div>{element.cant}</div>
                  <div>{element.nom}</div>
                  <div className="ml-auto">
                    {formatter.format(element.total)}
                  </div>
                </div>
              );
            })}
            <section className="flex mt-auto text-bold ">
              <div>IMPORTE TOTAL</div>
              <div className="ml-auto">{formatter.format(totalCarrito)}</div>
            </section>
            <div className="flex justify-start gap-x-3 mt-5 text-sm">
              <button
                className="bg-red-500 p-2 text-center rounded-sm font-bold text-white"
                onClick={fad}
              >
                VACIAR CARRITO
              </button>
              <button
                className="bg-green-500 p-2 text-center rounded-sm font-bold text-white"
                onClick={comprar}
              >
                COMPRAR
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Cart;
