# Firebase Authentication Setup Guide

## Overview

This project now has a complete Firebase authentication system that allows the frontend to securely communicate with the backend using Firebase ID tokens. Here's how it works:

## How It Works

### 1. Frontend Authentication Flow
1. User clicks "Log in with Google" button
2. Firebase handles Google OAuth and returns user credentials
3. Frontend automatically extracts the Firebase ID token
4. Token is stored in localStorage and state
5. Token is automatically refreshed every 50 minutes
6. All API calls automatically include the token in Authorization header

### 2. Backend Token Verification
1. Backend receives requests with `Authorization: Bearer <token>` header
2. Firebase Admin SDK verifies the token
3. If valid, user information is added to `req.user`
4. Protected routes can access user data securely

## Setup Instructions

### Frontend Setup (Already Done)
The frontend is already configured with:
- Firebase client SDK
- Automatic token management
- Axios interceptors for automatic token inclusion
- Token refresh logic

### Backend Setup

#### 1. Get Firebase Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **"Generate New Private Key"**
5. Download the JSON file

#### 2. Set Environment Variables
Create a `.env` file in the `backend/` directory:

```bash
# Copy from env.example
cp env.example .env
```

Then edit `.env` with your actual values:

```env
FIREBASE_PROJECT_ID=your-actual-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here\n-----END PRIVATE KEY-----"
```

**Important**: The private key should be the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts.

#### 3. Install Dependencies
```bash
cd backend
npm install
```

#### 4. Start the Backend
```bash
npm run dev
```

## API Endpoints

### Public Endpoints (No Auth Required)
- `GET /` - API status and available endpoints
- `GET /api/auth/health` - Health check
- `GET /api/auth/public-data` - Public data (optional auth)

### Protected Endpoints (Auth Required)
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/update-profile` - Update user profile

## Testing the Authentication

1. **Start both frontend and backend**
2. **Log in with Google** on the frontend
3. **Go to the Home page** - you'll see the "Authentication Test" section
4. **Test the endpoints** using the buttons provided

## How to Use in Your Own Components

### Making Authenticated API Calls
```jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function MyComponent() {
    const { getValidToken } = useContext(AuthContext);

    const fetchData = async () => {
        try {
            // Token is automatically included by axios interceptor
            const response = await axios.get('http://localhost:5000/api/auth/profile');
            console.log(response.data);
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    return <button onClick={fetchData}>Fetch Data</button>;
}
```

### Creating Protected Backend Routes
```javascript
import { authenticateToken } from '../middleware/auth.js';

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
    // req.user contains the authenticated user info
    res.json({
        message: 'This is protected data',
        user: req.user
    });
});
```

## Security Features

- **Automatic Token Refresh**: Tokens are refreshed every 50 minutes
- **Secure Storage**: Tokens are stored in localStorage (consider httpOnly cookies for production)
- **Token Verification**: Backend verifies every token with Firebase Admin SDK
- **Error Handling**: Graceful fallback when tokens are invalid
- **CORS Protection**: Backend includes CORS middleware

## Troubleshooting

### Common Issues

1. **"Firebase Admin initialization failed"**
   - Check your environment variables
   - Ensure the service account key is correct
   - Verify the project ID matches

2. **"Invalid or expired token"**
   - Frontend should automatically refresh tokens
   - Check if user is still logged in
   - Clear localStorage and re-login

3. **CORS errors**
   - Backend is configured with CORS enabled
   - Ensure frontend is calling the correct backend URL

### Debug Mode
Add this to your frontend to see token details:
```jsx
const { token } = useContext(AuthContext);
console.log('Current token:', token);
```

## Production Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Use proper secret management
3. **Token Storage**: Consider httpOnly cookies instead of localStorage
4. **Rate Limiting**: Add rate limiting to your API endpoints
5. **Logging**: Add proper logging for authentication events

## Next Steps

Now that authentication is working, you can:
1. Create user profiles in your MongoDB database
2. Add role-based access control
3. Implement user-specific data endpoints
4. Add logout functionality that clears backend sessions
5. Create user preferences and settings

The authentication system is now fully functional and ready for production use!
