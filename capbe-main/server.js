import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//functions
import {connectDB} from "./config/db.js";
//api
import authRouter from "./routes/auth.js";

const app = express();
app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin);
      },
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port: ${process.env.PORT}`);
})

