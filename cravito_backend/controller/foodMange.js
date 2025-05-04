const foodModel = require("../modules/foodModel.js");
const fs = require("fs");

const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.send({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error" });
  }
};
//listed data
const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.send({ success: true, data: foods , message:"Food Items Listed" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error" });
  }
};
//remove food item
const removeItem = async (req, res) => {
  // const id= req.params.id
  const id = req.body.id
  try {
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});
    const item = await foodModel.findByIdAndDelete(id);
    res.send({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error" });
  }
};
module.exports = { addFood, foodList, removeItem };
