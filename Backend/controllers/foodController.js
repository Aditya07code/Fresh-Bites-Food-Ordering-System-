import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

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

export const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        console.log("Food Image Path from DB:", food.image);

        // Ensure the image path is correctly formatted
        if (food.image) {
            const imagePath = path.resolve(food.image).replace(/\\/g, "/");
            console.log("Resolved Image Path:", imagePath);

            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath); // Delete the file
                    console.log("Image deleted successfully!");
                } catch (err) {
                    console.error("Error deleting image:", err);
                }
            } else {
                console.log("Image file not found in directory!");
            }
        }

        // Delete food from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
};



