import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginButton() {
    const { handleLogin } = useContext(AuthContext);

    return (
        <button onClick={handleLogin} className="login-button">
            Log in with Google
        </button>
    );
};

export default LoginButton;
