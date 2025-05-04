const express = require("express")
const {placeOrder,verifyOrder,userOrders,ordersList,updateStatus} = require("../controller/orderManage.js")
const authMiddleWare = require("../middileware/auth.js")


const orderRoute = express.Router()

orderRoute.post("/place",authMiddleWare,placeOrder)
orderRoute.post("/verify",verifyOrder);
orderRoute.post("/userorder",authMiddleWare,userOrders)
orderRoute.get("/orderslist",ordersList)
orderRoute.post("/status",updateStatus)

module.exports = orderRoute