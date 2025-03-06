import foodModel from "../models/foodModel.js";
import fs from 'fs';

export const addFood = async(req,res)=>{
  console.log("Received file:", req.file);
  console.log("Received form data:", req.body);

  if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
  }




  const image = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error occured"})
        res.send(error)
    }

}


