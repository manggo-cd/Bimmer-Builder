import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './mongodb/mongo.js';
import authRoutes from './routes/auth.js';

// Initialize Firebase Admin (this will run the firebase-admin.js file)
import './firebase-admin.js';

dotenv.config();
const app = express();

// Cors
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({
        message: 'Bimmer Builder Backend API',
        status: 'Running',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/auth',
            health: '/api/auth/health',
            profile: '/api/auth/profile (protected)',
            updateProfile: '/api/auth/update-profile (protected)',
            publicData: '/api/auth/public-data (optional auth)'
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Firebase Admin initialized: ${process.env.FIREBASE_PROJECT_ID ? 'Yes' : 'No'}`);
});
