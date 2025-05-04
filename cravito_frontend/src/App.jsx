import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import LoginPage from "./components/login page/LoginPage";
import Cart from "./pages/cart/Cart.jsx";
import OrderToPlace from "./pages/order to place/OrderToPlace.jsx";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/my orders/MyOrders.jsx";

function App() {
  const [login, setLogin] = useState(false);
  //  if (login) {
  //    return <LoginPage setLogin={setLogin} />;
  //  }

  return (
    <>
      {login ? <LoginPage setLogin={setLogin} /> : <div></div>}

      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderToPlace />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
