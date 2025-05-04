const express = require("express");
const {addFood,foodList,removeItem} = require("../controller/foodMange.js");
const multer = require("multer");

const foodRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.get("/datalist",foodList)
// foodRoute.delete("/remove/:id",removeItem)
foodRoute.delete("/remove",removeItem)
module.exports = foodRoute;
