import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

connectDB();


app.use("/images", express.static("uploads"));
app.use("/api/food",foodRouter);
app.use("/api/user",userRouter);



app.get("/",(req,res)=>{
  res.send("API working");
})

app.listen(port,()=>{
  console.log(`Server started at port: ${port}`);
})



//     mongodb+srv://aditya9076gupta:<db_password>@cluster0.h1nfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0