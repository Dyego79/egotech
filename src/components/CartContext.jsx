import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const contexto = createContext();
const { Provider } = contexto;

const ProviderReturn = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [productquantity, setproductquantity] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [totalCarrito, setTotalcarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({});

  const eliminarProducto = (e) => {
    const elimCant = parseInt(e.value);
    setproductquantity(productquantity - elimCant);
    const carritoCopy = [...carrito];
    const newArray = carritoCopy.filter((item) => item.id !== e.id);
    const newArray2 = carritoCopy.filter((item) => item.id === e.id);
    const restaTotal = newArray2[total].total;
    setCarrito(newArray);
    setTotalcarrito(totalCarrito - restaTotal);
  };
  const agregarOrden = (orden, resultado) => {
    setOrder(orden);
  };
  const addProductCompleto = (nombre, cant) => {
    const carritoCopy = [...carrito];
    const itemSeleccionado = carritoCopy.filter((detalle) => {
      return nombre.id === detalle.id;
    })[0];
    if (!itemSeleccionado) {
      const t = [];
      carritoCopy.push(nombre);
      const totalparacarrito = carritoCopy.map((precio) => {
        t.push(precio.total);
        return precio;
      });
      setCarrito(carritoCopy);
      setTotalcarrito(totalparacarrito);
      setproductquantity(productquantity + nombre.cant);
      const sumaCarrito = [...t].reduce((prev, curr) => prev + curr, 0);
      setTotalcarrito(sumaCarrito);
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "conf",
          cancelButton: "cancel",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Este producto ya fue agregado!",
          text: "¿Querés modificar la cantidad?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Modificar",
          cancelButtonText: "Cancelar!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            carritoCopy.map(function (dato) {
              if (dato.id === nombre.id) {
                dato.total = cant * dato.precio;
                setproductquantity(productquantity - dato.cant + cant);
                dato.cant = cant;
              }
              const t = carritoCopy
                .map((item) => item.total)
                .reduce((prev, curr) => prev + curr, 0);
              setTotalcarrito(t);
              return dato;
            });
            swalWithBootstrapButtons.fire(
              "MODIFICADO!",
              "La cantidad se modifico correctamente!",
              "success"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelado",
              "La cantida no fue modificada",
              "error"
            );
          }
        });
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setproductquantity(0);
  };

  const contextVal = {
    productquantity,
    carrito,
    totalCarrito,
    order,
    precioTotal,
    total,
    agregarOrden,
    setPrecioTotal,
    addProductCompleto,
    //addCant,
    eliminarProducto,
    vaciarCarrito,
  };

  return <Provider value={contextVal}>{children}</Provider>;
};
export default ProviderReturn;
