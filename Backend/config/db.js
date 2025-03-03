import mongoose from "mongoose";

export const connectDB = async()=>{
  await mongoose.connect('mongodb+srv://aditya9076gupta:9076739195@cluster0.h1nfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"));
}