import React from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";

function Orders({url}) {
  const [orderData, setOrderData] = useState([]);

  const fetchOrdersList = async () => {
    const response = await axios.get(url + "/api/order/orderslist");
    if (response.data.success) {
      setOrderData(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };


  const statusHandler = async(event,orderId)=>{
   const response = await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   })
   if(response.data.success){
    await fetchOrdersList();
   }
  }
  useEffect(() => {
    fetchOrdersList();
  }, []);

  return (
    <div className="orders">
      <h2>User Orders</h2>
      <div className="orders_list">
        {orderData.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + "x" + item.quantity;
                    } else {
                      return item.name + "x" + item.quantity + ",";
                    }
                  })}
                </p>
                <p className="order-item-username">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.address + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.pincode +
                      ","}
                  </p>
                </div>
                <p className="order-item-phno">{order.address.phoneNo + ","}</p>
              </div>

              <p>Items: {order.items.length}</p>
              <p>${order.amount}.00</p>
              <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status} className="order-item-select">
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
