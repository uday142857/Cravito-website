import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { contextStore } from "../../context/Context";

function FoodItem({ id, description, image, price, rating, key, name }) {
  const [count, setCount] = useState(0);
  const{cartItems,addItems,removeItems,url}=useContext(contextStore)
  return (
    <div className="food-item">
      <div className="food-item-box">
        <img className="food-item-image" src={url+"/img/"+image} alt="" />
        {!cartItems[id]? (
          <img
            className="add"
            onClick={()=>{addItems(id)}}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-count">
            <img
              onClick={()=>{removeItems(id)}}
              src={assets.remove_icon_red}
              alt=""
            />
            <h3>{cartItems[id]}</h3>
            <img
              onClick={()=>{addItems(id)}}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-ratings">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
      </div>
      <div className="food-item-desc">
        <p>{description}</p>
        <h4>${price}</h4>
      </div>
    </div>
  );
}

export default FoodItem;
