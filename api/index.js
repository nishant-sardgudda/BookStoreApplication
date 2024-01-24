import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import roleRouter from "./routes/role.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json()); //Middleware for JSON object
app.use(cookieParser()); //Middleware for cookie parsing
app.use(cors({
    origin : 'http://localhost:4200',
    credentials : true
})); //To connect frontend to backend avoid cors policy issue
app.use('/api/role', roleRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

//Response Handler Middleware
app.use((data, req, res, next)=>{
    const statusCode = data.status || 500;
    const message = data.message || "Something went wrong!";
    return res.status(statusCode).json({
        success : [200, 201, 204].some(a => a === statusCode) ? true : false,
        status : statusCode,
        message : message,
        description : data.data
    });
});

//DB Connection
const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection is successful!");
    } catch (error) {
        throw error;
    }
}

//App listening port
app.listen(8800, ()=>{
    connectMongoDB();
    console.log("Connected to backend!");
})