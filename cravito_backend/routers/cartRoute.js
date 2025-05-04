const express = require("express")
const {addToCart,removeFromCart,getCartData} = require("../controller/cartManage.js")
const authMiddleWare = require("../middileware/auth.js")

const cartRoute = express.Router()

cartRoute.post("/addtocart",authMiddleWare,addToCart)
cartRoute.delete("/removefromcart",authMiddleWare,removeFromCart)
cartRoute.post("/getcart",authMiddleWare,getCartData)


module.exports = cartRoute