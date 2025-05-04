const express = require("express");
const { loginUser, registerUser } = require("../controller/userMange.js");
const userRoute = express.Router()


userRoute.post("/login",loginUser)
userRoute.post("/register",registerUser)

module.exports = userRoute