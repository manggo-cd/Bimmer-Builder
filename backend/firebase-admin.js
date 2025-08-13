import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
    try {
        // You can either use service account key file or environment variables
        // Option 1: Using service account key file (recommended for production)
        // const serviceAccount = require('./path-to-service-account-key.json');
        // initializeApp({
        //     credential: cert(serviceAccount)
        // });

        // Option 2: Using environment variables (easier for development)
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
        
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase Admin initialization failed:', error);
        // Don't throw error here, let the app continue without Firebase Admin
        // You might want to handle this differently in production
    }
}

export const adminAuth = getAuth();
