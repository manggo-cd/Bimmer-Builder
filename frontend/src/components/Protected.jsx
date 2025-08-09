import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import NavBar from './NavBar';
import Footer from './Footer';

function Protected() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    };

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Protected;
