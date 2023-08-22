import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./ItemListContainer";
import ItemDetailContainer from "./ItemDetailContainer";
import Cart from "./Cart";

const Main = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/productos/:category" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
