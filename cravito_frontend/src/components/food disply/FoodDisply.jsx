import React, { useContext, useEffect } from "react";
import { contextStore } from "../../context/Context";
import "./FoodDisply.css";
import FoodItem from "../food item/FoodItem";

function FoodDisply({ category }) {
  const { food_list } = useContext(contextStore);
  useEffect(() => {
    console.log(food_list);
  }, []);
  return (
    <div className="food-display" id="food-display">
      <h2>Best Items Here..</h2>
      <div className="food-display-list">
        {food_list
          .filter((item)=>category === "Off" || category === item.category)
          .map((item, index) => {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
      </div>
    </div>
  );
}

export default FoodDisply;
