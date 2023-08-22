import ItemDetail from "./ItemDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./database";
import { collection, getDoc, doc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [cargando, setCargando] = useState(true);
  const [detalle, setdetalle] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const productoCollection = collection(db, "productos");
    const resultadoDelDoc = doc(productoCollection, id);
    const getItem = getDoc(resultadoDelDoc);
    getItem
      .then((resultado) => {
        const resultadoFinal = resultado.data();
        resultadoFinal.id = id;
        setdetalle(resultadoFinal);
        setCargando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
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
        <ItemDetail detalle={detalle} id="id" />
      )}
    </>
  );
};
export default ItemDetailContainer;
