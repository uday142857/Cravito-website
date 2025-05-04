import React, { useContext, useState, useEffect } from "react";
import "./OrderToPlace.css";
import { contextStore } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderToPlace() {
  const { getCartItemCost, token, food_list, cartItems, url } =
    useContext(contextStore);
  const navigate= useNavigate()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    // console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getCartItemCost() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    }
    else if(getCartItemCost()===0){
      navigate("/cart")
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="order-page">
      <div className="order-details-left">
        <h2>Delevary details</h2>
        <div className="multi-input">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          placeholder="Email Id"
        />
        <input
          required
          type="number"
          onChange={onChangeHandler}
          name="phoneNo"
          value={data.phoneNo}
          placeholder="Phone No"
        />
        <div className="multi-input">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            placeholder="Country"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-input">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="number"
            onChange={onChangeHandler}
            name="pincode"
            value={data.pincode}
            placeholder="Pin code"
          />
        </div>
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="address"
          value={data.address}
          placeholder="Address 1"
        />
      </div>
      <div className="order-details-right">
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
                <p>${getCartItemCost() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total1">
                <h3>Total</h3>
                <p>${getCartItemCost() === 0 ? 0 : getCartItemCost() + 2}</p>
              </div>
            </div>
            <button type="submit">Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default OrderToPlace;
