import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="left">
          <h1>Cravito</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fuga aliquid sint vel a cum sit, temporibus possimus iure amet?
          </p>
          <div className="icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delevary</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="right">
          <h2>BE WITH US</h2>
          <ul>
            <li>+91 91335 60965</li>
            <li>contact@cravito.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>
        All copyright are properties of their respective owners. 2008-2025 ©
        Cravito™ Ltd. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
