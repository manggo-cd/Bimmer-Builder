import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './mongodb/mongo.js';

dotenv.config();
const app = express();

// Cors
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded());

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
