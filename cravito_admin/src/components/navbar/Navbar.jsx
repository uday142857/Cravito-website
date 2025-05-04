import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h1>Cravito</h1>
        <p>Admin Panel</p>
      </div>
      <img src={assets.profile_image}/>
      {/* <i class="bi bi-person-circle"></i> */}
    </div>
  );
}

export default Navbar