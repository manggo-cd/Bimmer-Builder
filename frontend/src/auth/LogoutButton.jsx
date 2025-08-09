import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LogoutButton() {
    const { handleLogout } = useContext(AuthContext);

    return (
        <button onClick={handleLogout} className="logout-button">
            Log out
        </button>
    );
};

export default LogoutButton;
