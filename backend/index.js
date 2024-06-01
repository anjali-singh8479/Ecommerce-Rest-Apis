import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
dotenv.config()
const app=express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/auth",authRoutes);
app.listen(process.env.PORT || "8800",()=>{
    console.log("backend connected");
})