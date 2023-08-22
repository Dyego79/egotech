import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import ProviderReturn from "./components/CartContext";

function App() {
  return (
    <>
      <ProviderReturn>
        <BrowserRouter>
          <Header />
          <Main />
        </BrowserRouter>
      </ProviderReturn>
    </>
  );
}

export default App;
