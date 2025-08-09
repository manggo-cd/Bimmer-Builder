import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router';

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
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/login");
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <>
            <AuthContext.Provider
                value={{
                    user,
                    setUser,
                    handleLogin,
                    handleLogout,
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
};

export { AuthContext, AuthProvider };
