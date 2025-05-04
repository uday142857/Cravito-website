const mongoose = require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(
      "mongodb+srv://CravitoApp:Cravito2113@cluster0.ngwxrrx.mongodb.net/cravito"
    ).then(()=>console.log("DB connected"));
}
module.exports=connectDB

