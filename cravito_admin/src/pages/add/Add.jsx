import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add({url}) {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
 
  const onChangeData = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setData({ ...data, [key]: value });
  };
  //   useEffect(()=>{
  //     console.log(data)
  //   },[data])
  const submitdata = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    // formData.append("image", image);
     if (image) {
       // check if image exists
       formData.append("image", image);
     } else {
      //  toast.error("Please select an image again!");
       return; // stop if no image
     }
    const response = await axios.post(
      url+"/api/food/add",
      formData
    );
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <form className="add" onSubmit={submitdata}>
      <div className="col">
        <div className="upload-img col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-name col">
          <p>Food Item Name</p>
          <input
            type="text"
            onChange={onChangeData}
            value={data.name}
            name="name"
            placeholder="Enter Item Name"
          />
        </div>
        <div className="add-description col">
          <p>Food Item Description</p>
          <textarea
            name="description"
            rows="6"
            onChange={onChangeData}
            value={data.description}
            placeholder="About Item"
          ></textarea>
        </div>
        <div className="add-category-price col">
          <div className="add-category col" >
            <p>Food Category</p>
            <select
              onChange={onChangeData}
              name="category"
              value={data.category}
            >
              <option value="">-- Select --</option>
              <option value="Salads">Salads</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price col">
            <p>Food Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeData}
              value={data.price}
              placeholder="$20"
            />
          </div>
        </div>
        <button className="add-btn" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default Add;
