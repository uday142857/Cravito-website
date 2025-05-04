const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: { type: Object, default:{} },
},{minimize:false});

const userModel = mongoose.models.user || mongoose.model("user",userSchema)
module.exports = userModel