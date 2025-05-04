import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { contextStore } from "../../context/Context";
import axios from "axios"

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url} = useContext(contextStore);
  const navigate = useNavigate();

  const verifyPament = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders")
    }else{
      navigate("/")
    }
  };
  useEffect(()=>{
    verifyPament()
  },[])

  // console.log(success,orderId)
  return (
    <div className="verify">
      <div className="circle"></div>
    </div>
  );
}

export default Verify;
