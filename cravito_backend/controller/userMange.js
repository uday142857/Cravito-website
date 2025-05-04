const userModel = require("../modules/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");


//jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY);
};

//user login
const loginUser = async (req, res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Not Found"})
        }
        const isCompare = await bcrypt.compare(password,user.password)
        if(!isCompare){
            return res.json({success:false,message:"Inavalid Password"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};


//user register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.json({ success: false, message: "User already exist" });
    }
    //check valid email && strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

module.exports = { loginUser, registerUser };

