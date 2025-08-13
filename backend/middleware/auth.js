import { adminAuth } from '../firebase-admin.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. Invalid token format.' 
            });
        }

        try {
            // Verify the Firebase ID token
            const decodedToken = await adminAuth.verifyIdToken(token);
            
            // Add user info to request object
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
                emailVerified: decodedToken.email_verified
            };
            
            next();
        } catch (firebaseError) {
            console.error('Firebase token verification failed:', firebaseError);
            return res.status(401).json({ 
                error: 'Invalid or expired token.' 
            });
        }
    } catch (error) {
        console.error('Authentication middleware error:', error);
        return res.status(500).json({ 
            error: 'Internal server error during authentication.' 
        });
    }
};

// Optional: Middleware to check if user is authenticated
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            
            if (token) {
                try {
                    const decodedToken = await adminAuth.verifyIdToken(token);
                    req.user = {
                        uid: decodedToken.uid,
                        email: decodedToken.email,
                        name: decodedToken.name,
                        picture: decodedToken.picture,
                        emailVerified: decodedToken.email_verified
                    };
                } catch (firebaseError) {
                    // Token is invalid, but we don't block the request
                    console.log('Invalid token in optional auth:', firebaseError.message);
                }
            }
        }
        
        next();
    } catch (error) {
        console.error('Optional auth middleware error:', error);
        next(); // Continue even if there's an error
    }
};
