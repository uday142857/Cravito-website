import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="option">
          <h2>
            <i class="bi bi-plus-circle"></i>
          </h2>
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="option">
          <h2>
            <i class="bi bi-list-check"></i>
          </h2>
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="option">
          <h2>
            <i class="bi bi-box-fill"></i>
          </h2>
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
