import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const foodRouter = express.Router();


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });



foodRouter.post("/add", (req, res, next) => {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);
    next();
}, upload.single("image"), addFood);

export default foodRouter;
