import express from 'express'
import dotenv from "dotenv";
import { connectDb } from './Database/db.js';
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
})

const app =express()

//using middlewares
app.use(express.json());
app.use(cors());//Now we can do cross requsest

const port =process.env.PORT;


app.get('/',(req,res)=>{
    res.send("Server is working")
})

app.use("/uploads",express.static("uploads"))

//important routes
import userRoutes from './routes/user.js'
import courseRoutes from './routes/course.js'
import adminRoutes from './routes/admin.js'

//Using routes
app.use("/api",userRoutes);
app.use("/api",courseRoutes);
app.use('/api',adminRoutes)


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb()
})



//After completing backend { npm i cors } is written which will help in fetching backend api in frontend without
//any error of cross site request