import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./database";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const productosCollection = collection(db, "productos");
    if (category !== undefined && category !== "") {
      const filtrarProdcuto = query(
        productosCollection,
        where("categoria", "==", category)
      );
      const getItem = getDocs(filtrarProdcuto);
      getItem
        .then((resultado) => {
          const productos = resultado.docs.map((doc) => {
            const productoConId = doc.data();
            productoConId.id = doc.id;
            return productoConId;
          });
          setProductos(productos);
          setCargando(false);
        })
        .catch((error) => {})
        .finally(() => {});
      setCargando(true);
    } else {
      const getItem = getDocs(productosCollection);
      getItem
        .then((resultado) => {
          const productos = resultado.docs.map((doc) => {
            const productoConId = doc.data();
            productoConId.id = doc.id;
            return productoConId;
          });
          setProductos(productos);
          setCargando(false);
        })
        .catch((error) => {})
        .finally(() => {});
      setCargando(true);
    }
  }, [category]);

  return (
    <>
      {cargando ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <ItemList productos={productos} />
      )}
    </>
  );
};

export default ItemListContainer;
