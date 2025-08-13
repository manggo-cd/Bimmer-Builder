import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import {
    auth,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from '../auth/firebaseConfig';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Setup axios interceptor to include auth token
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [token]);

    // Handle token refresh
    const refreshToken = async (user) => {
        try {
            const newToken = await user.getIdToken(true);
            setToken(newToken);
            localStorage.setItem('firebaseToken', newToken);
            return newToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                
                // Get the ID token
                try {
                    const idToken = await currentUser.getIdToken();
                    setToken(idToken);
                    localStorage.setItem('firebaseToken', idToken);
                    
                    // Set up token refresh every 50 minutes (tokens expire in 1 hour)
                    const tokenRefreshInterval = setInterval(async () => {
                        const refreshedToken = await refreshToken(currentUser);
                        if (!refreshedToken) {
                            // If refresh fails, logout user
                            await handleLogout();
                        }
                    }, 50 * 60 * 1000);

                    // Store interval ID for cleanup
                    currentUser.tokenRefreshInterval = tokenRefreshInterval;
                } catch (error) {
                    console.error('Failed to get ID token:', error);
                    await handleLogout();
                }
            } else {
                setUser(null);
                setToken(null);
                localStorage.removeItem('firebaseToken');
                navigate("/login");
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    async function handleLogin() {
        try {
            setLoading(true);
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error.message);
            setLoading(false);
        }
    };

    async function handleLogout() {
        try {
            // Clear any token refresh intervals
            if (user && user.tokenRefreshInterval) {
                clearInterval(user.tokenRefreshInterval);
            }
            
            await signOut(auth);
            setUser(null);
            setToken(null);
            localStorage.removeItem('firebaseToken');
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    // Function to manually refresh token (useful for API calls)
    const getValidToken = async () => {
        if (!user) return null;
        
        try {
            const currentToken = await user.getIdToken(true);
            setToken(currentToken);
            localStorage.setItem('firebaseToken', currentToken);
            return currentToken;
        } catch (error) {
            console.error('Failed to get valid token:', error);
            await handleLogout();
            return null;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AuthContext.Provider
                value={{
                    user,
                    setUser,
                    token,
                    loading,
                    handleLogin,
                    handleLogout,
                    getValidToken,
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
};

export { AuthContext, AuthProvider };
