import mongoose from "mongoose";

const connectToDB=async ()=>{
   try{
    await mongoose.connect(process.env.MONGODB_URL ,{
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
  });
    console.log("connected to db");
}catch(err){
    throw new Error(err.message);
}
   }



export default connectToDB;