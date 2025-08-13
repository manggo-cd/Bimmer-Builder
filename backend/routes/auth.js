import express from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Protected route - requires valid Firebase token
router.get('/profile', authenticateToken, (req, res) => {
    try {
        // req.user is populated by the authenticateToken middleware
        res.json({
            message: 'Profile accessed successfully',
            user: req.user,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Profile route error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Protected route - requires valid Firebase token
router.post('/update-profile', authenticateToken, (req, res) => {
    try {
        const { displayName, preferences } = req.body;
        
        // Here you would typically update the user's profile in your database
        // For now, we'll just return the data that would be updated
        
        res.json({
            message: 'Profile update request received',
            user: req.user,
            updates: {
                displayName,
                preferences
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Update profile route error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Optional auth route - works with or without token
router.get('/public-data', optionalAuth, (req, res) => {
    try {
        const response = {
            message: 'Public data accessed',
            timestamp: new Date().toISOString(),
            isAuthenticated: !!req.user
        };
        
        if (req.user) {
            response.user = {
                uid: req.user.uid,
                email: req.user.email,
                name: req.user.name
            };
        }
        
        res.json(response);
    } catch (error) {
        console.error('Public data route error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check route - no auth required
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Authentication service is running',
        timestamp: new Date().toISOString()
    });
});

export default router;
