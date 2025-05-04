require("dotenv").config();
const orderModle = require("../modules/orderModel.js");
const userModel = require("../modules/userModel.js");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModle({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cart: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delevary charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true" || success === true) {
      await orderModle.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModle.findByIdAndUpdate(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


//user orders for frontend

const userOrders = async (req,res)=>{
  try {
    const order = await orderModle.find({ userId: req.body.userId });
    res.json({success:true,data:order})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
  
}

//list the users orders at admin

const ordersList = async (req,res)=>{
  try {
    const orders = await orderModle.find({})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" });
  }
}


//api for status updating

const updateStatus = async(req,res)=>{
  try {
    await orderModle.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message:"Status Updated"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
  
}

module.exports = { placeOrder, verifyOrder,userOrders,ordersList,updateStatus };
