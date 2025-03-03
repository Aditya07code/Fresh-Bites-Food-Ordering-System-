import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const foodRouter = express.Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });


foodRouter.post("/add", (req, res, next) => {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);
    next();
}, upload.single("image"), addFood);

export default foodRouter;
