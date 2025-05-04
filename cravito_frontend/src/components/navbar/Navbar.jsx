import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { contextStore } from "../../context/Context";

function Navbar({ setLogin }) {
  const [acti, setActi] = useState("Home");
  const { getCartItemCost, token, setToken } = useContext(contextStore);
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")

  }
  return (
    <div className="navbar">
      <h1 className="logo">Cravito</h1>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setActi("Home");
          }}
          className={acti === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#menu-items"
          onClick={() => {
            setActi("Menu");
          }}
          className={acti === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setActi("MobileApp");
          }}
          className={acti === "MobileApp" ? "active" : ""}
        >
          MobileApp
        </a>
        <a
          href="#footer"
          onClick={() => {
            setActi("Contact Us");
          }}
          className={acti === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <i class="bi bi-search"></i>
        <div className="navbar-cart">
          <Link to="/cart">
            <i class="bi bi-cart2"></i>
          </Link>

          <div className={getCartItemCost() === 0 ? "" : "cart-dot"}></div>
        </div>
        {!token ? (
          <button
            onClick={() => {
              setLogin(true);
            }}
          >
            Sigh Up
          </button>
        ) : (
          <div className="nav-profile">
            <i class="bi bi-person-circle"></i>
            <ul className="nav-profile-dropdown">
              <li onClick={()=>{navigate("/myorders")}}>
                <i class="bi bi-bag-heart-fill"></i>
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <i class="bi bi-box-arrow-right"></i>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
