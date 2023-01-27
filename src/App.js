import React from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Item from "./components/pages/Item";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:idItem" element={<Item />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
