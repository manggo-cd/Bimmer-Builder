import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginButton from '../auth/LoginButton';
import { AuthContext } from '../context/AuthContext';

import '../css/Login.css';

function Login() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <LoginButton />
        </>
    )
};

export default Login;
