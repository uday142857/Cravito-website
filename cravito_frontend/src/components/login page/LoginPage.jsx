import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.css";
import { assets } from "../../assets/assets";
import { contextStore } from "../../context/Context";
import axios from "axios"

function LoginPage({ setLogin }) {
  const [value, setValue] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { url,token,setToken} = useContext(contextStore);
  const onChangeHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setData({ ...data, [key]: value });
  };
  // useEffect(()=>{
  //   console.log(data)
  // },[data])
  const userLogin = async (event) => {
    event.preventDefault()
    var newUrl = url
    if(value === "Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    const  userData = await axios.post(newUrl,data) 
    if(userData.data.success){
      setToken(userData.data.token)
      localStorage.setItem("token",userData.data.token)
      setLogin(false)
    }
    else{
      // alert()
    }
  };
  return (
    <div className="login-page">
      <form onClick={userLogin} className="login-form">
        <div className="login-title">
          <h2>{value}</h2>
          <img
            onClick={() => {
              setLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-inputs">
          {value === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              placeholder="Enter Your Name"
            />
          )}

          <input
            type="email"
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            placeholder="Enter Your Email Id"
          />
          <input
            type="password"
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            placeholder="Enter Valid Password"
          />
        </div>
        <button type="submit">{value === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-conditions">
          <input type="checkbox" />
          <p>I agree all terms & conditions</p>
        </div>
        {value === "Login" ? (
          <h5>
            Create a new account?{" "}
            <span
              onClick={() => {
                setValue("Sign Up");
              }}
            >
              Click here
            </span>
          </h5>
        ) : (
          <h5>
            already had account ?{" "}
            <span
              onClick={() => {
                setValue("Login");
              }}
            >
              Login here
            </span>
          </h5>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
