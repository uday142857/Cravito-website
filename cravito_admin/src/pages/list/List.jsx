import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./List.css";

function List({url}) {
  const [list, setList] = useState([]);
  const fettchList = async () => {
    const listData = await axios.get(url+"/api/food/datalist");
    console.log(listData.data.data);
    if (listData.data.success) {
      setList(listData.data.data);
      toast.success(listData.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fettchList();
  }, []);
  const removeItem = async (foodId) => {
    // const data = await axios.delete(`http://localhost:2113/api/food/remove/${foodId}`);
    const data = await axios.delete(url+`/api/food/remove`, {
      data: { id: foodId },
    });
    // console.log(foodId)
    fettchList();
    if (data.data.success) {
      toast.success(data.data.message);
    } else {
      toast.error("Error");
    }
  };
  return (
    <div className="list col">
      <p>All List Food Items</p>
      <div className="list-tabel">
        <div className="list-tabel-formate title ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-tabel-formate ">
              <img src={ url+`/img/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeItem(item._id)} className="btn">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
