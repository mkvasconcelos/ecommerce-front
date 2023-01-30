import React, { useState } from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Item from "./components/pages/Item";
import Cart from "./components/pages/Cart";
import SignIn from "./components/pages/SignIn";
import { IncomeContext, NameContext, TokenContext } from "./context/context";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import AdminSignIn from "./components/pages/AdminSignIn";
import Admin from "./components/pages/Admin";
import AddItems from "./components/pages/AddItems";
import UpdateItems from "./components/pages/UpdateItem";

function App() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [income, setIncome] = useState("");
  return (
    <>
      <TokenContext.Provider value={{ token, setToken }}>
        <NameContext.Provider value={{ name, setName }}>
          <IncomeContext.Provider value={{ income, setIncome }}>
            <BrowserRouter>
              <GlobalStyle />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:idItem" element={<Item />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin-sign-in" element={<AdminSignIn />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin-add" element={<AddItems />} />
                <Route path="/admin-update" element={<UpdateItems />} />
              </Routes>
            </BrowserRouter>
          </IncomeContext.Provider>
        </NameContext.Provider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
