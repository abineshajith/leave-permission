import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'

const port = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB
connectDB(); 
app.use(cors()); 
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));



