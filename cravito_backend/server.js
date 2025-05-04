require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const foodRoute = require("./routers/foodRoute.js");
const userRoute = require("./routers/userRoute.js");
const cartRoute = require("./routers/cartRoute.js");
const orderRoute = require("./routers/orderRoute.js");
// const key = require("dotenv/config.js")

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || "2113"

//Database connect
connectDB();

//api endpoint
app.use("/api/food", foodRoute);
app.use("/img", express.static("uploads"));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// app.get("/",(req,res)=>{
//     res.send("Get Data")
// })

app.listen(port, () => {
  console.log("Server Started");
});
