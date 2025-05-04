const userModel = require("../modules/userModel.js");

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.userId });
    const cart =  userData.cart;
    if (!cart[req.body.itemId]) {
      cart[req.body.itemId] = 1;
    } else {
      cart[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cart})
    res.json({success:true,message:"Added to cart"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};
const removeFromCart =async (req, res) => {
    try {
        const userData = await userModel.findById({ _id: req.body.userId });
        const cart = userData.cart;
        if (cart[req.body.itemId]>0) {
          cart[req.body.itemId] -= 1;
        }
         await userModel.findByIdAndUpdate(req.body.userId, { cart });
         res.json({ success: true, message: "Remove from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
    
};
const getCartData = async (req, res) => {
    try {
         const userData = await userModel.findById({ _id: req.body.userId });
         const cart = userData.cart;
         res.json({success:true,cart})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

module.exports = { addToCart, removeFromCart, getCartData };
