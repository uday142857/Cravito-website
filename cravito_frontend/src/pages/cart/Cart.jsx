import React, { useContext } from "react";
import "./Cart.css";
import { contextStore } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    food_list,
    cartItems,
    deleteFromCart,
    addItems,
    removeItems,
    getCartItemCost,
    url
  } = useContext(contextStore);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-headings">
          <h4>Item</h4>
          <h4>Name</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Total</h4>
          <h4>Remove</h4>
        </div>
        <div className="respo">
          <h2>Cart Items</h2>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div className="cart-items-details cart-headings">
                  <img src={url+"/img/"+item.image} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p className="quantity">
                    <i
                      onClick={() => {
                        removeItems(item._id);
                      }}
                      class="bi bi-dash remove"
                    ></i>
                    {cartItems[item._id]}
                    <i
                      onClick={() => {
                        addItems(item._id);
                      }}
                      class="bi bi-plus add"
                    ></i>
                  </p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p>
                    <i
                      onClick={() => {
                        deleteFromCart(item._id);
                      }}
                      class="bi bi-trash delete"
                    ></i>
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart-down">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total1">
              <h4>Sub total</h4>
              <p>${getCartItemCost()}</p>
            </div>
            <hr />
            <div className="cart-total1">
              <h4>Delevery Fee</h4>
              <p>${getCartItemCost()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total1">
              <h3>Total</h3>
              <p>${getCartItemCost()===0?0:getCartItemCost() + 2}</p>
            </div>
          </div>
          <button onClick={()=>navigate("/orders")}>Checkout</button>
        </div>
        <div className="cart-promocode">
          <p>Please enter your Promocode !</p>
          <div className="code-input">
            <input type="text" placeholder="Enter your Promocode" />
            <button>Sumbit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
