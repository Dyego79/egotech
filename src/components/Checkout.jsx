import React from "react";
import { contexto } from "./CartContext";
import { useContext, useState } from "react";
const { DateTime } = require("luxon");

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

const Checkout = () => {
  const { order, idcompra } = useContext(contexto);
  console.log(order);

  return (
    <>
      <section className="animate__animated animate__fadeIn animate__faster">
        <div className="checkout__icon">
          <span className="material-symbols-outlined  animate__animated animate__fadeInUp animate__delay-0">
            check
          </span>
        </div>
        <h2 key={idcompra}>
          ¡Gracias por tu compra {order.buyer.name.toUpperCase()}!
        </h2>
        <div className="contenedorDatos">
          <div className="contenedorDatos__datos">
            <h3>Datos de Contacto: </h3>
          </div>
          <div className="contenedorDatos__phone">Tel: {order.buyer.phone}</div>
          <div className="contenedorDatos__email">
            e-mail: {order.buyer.email}
          </div>
        </div>
        <div className="contenedor__id">
          <div className="contenedor__id__id">Nº PEDIDO:</div>
          <div className="contenedor__id__numero">{idcompra}</div>
        </div>
        <div className="checkout__titulos">
          <div className="checkout__titulos__productos">Producto</div>
          <div className="checkout__titulos__cantidad">Cantidad</div>
        </div>
        {order.items.map((element) => {
          return (
            <>
              <div className="checkout__titulos">
                <div className="checkout__nombre">{element.nom}</div>
                <div className="checkout__cantidad">{element.cant}</div>
              </div>
            </>
          );
        })}
        <div className="checkout__total">
          <div className="checkout__total__total">Total</div>
          <div className="checkout__total__precio">
            {formatter.format(order.total)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
