import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const contextStore = createContext();

const Context = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const addItems = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/addtocart",{itemId},{headers:{token}})
    }
  };
  const removeItems = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.delete(
        url + "/api/cart/removefromcart",
       {data:{itemId} ,
         headers: { token } }
      );
    }
  };
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };
  const getCartItemCost = () => {
    let totalAmount = 0;
    for (const i in cartItems) {
      if (cartItems[i] > 0) {
        let itemDetails = food_list.find((product) => {
          return product._id === i;
        });
        if (itemDetails) {
          totalAmount += itemDetails.price * cartItems[i];
        }
      }
    }
    return totalAmount;
  };

  const fetchData = async () => {
    const response = await axios.get(url + "/api/food/datalist");
    setFoodList(response.data.data);
  };

  const loadListData = async (token)=>{
    const listData = await axios.post(url+"/api/cart/getcart",{},{headers:{token}})
    setCartItems(listData.data.cart)
  }
  useEffect(() => {
    // console.log(cartItems);
    function loadItems() {
      fetchData();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        loadListData(localStorage.getItem("token"))
      }
    }
    loadItems();
  }, []);
  const url = "http://localhost:2113";
  const data = {
    food_list,
    cartItems,
    addItems,
    removeItems,
    setCartItems,
    deleteFromCart,
    getCartItemCost,
    url,
    token,
    setToken,
  };
  return (
    <contextStore.Provider value={data}>{props.children}</contextStore.Provider>
  );
};
export default Context;
