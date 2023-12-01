// Using Mongo DB data base

import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const connection = await mongoose.connect(process.env.MONGO_URL)
    // console.log(`Connected to Mongo DB ${mongoose.connection.host}`);
  }catch(err){
    // console.log(`Could not connect to db`,err);
  }
}

export default connectDB