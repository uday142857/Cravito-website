import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { contextStore } from '../../context/Context'
import axios from 'axios'
import { assets } from '../../assets/assets'

function MyOrders() {
    const {url,token} = useContext(contextStore)
    const [data,setData] = useState([])

    const fetchUserOrder = async ()=>{
        const response = await axios.post(url+"/api/order/userorder",{},{headers:{token}})
        setData(response.data.data)
        console.log(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchUserOrder()
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
            {data.map((order,index)=>{
                return (
                  <div key={index} className="my-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>
                      {order.items.map((item, index) => {
                        //  return item.name + "x" + item.quantity + ",";
                        if (index === order.items.length - 1) {
                          return item.name + "x" + item.quantity;
                        } else {
                          return item.name + "x" + item.quantity + ",";
                        }
                      })}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p>
                      <span>&#x25cf;</span>
                       <b>{order.status}</b>
                    </p>
                    <button onClick={()=>{fetchUserOrder()}}>Track Order</button>
                  </div>
                );
            })}
        </div>
        
    </div>
  )
}

export default MyOrders