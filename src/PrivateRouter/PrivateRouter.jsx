import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { BloodAppContext } from '../Context/BloodAppContext';

const PrivateRouter = ({ children }) => {
    const { user, loader, authLoading, roleLoading } = useContext(BloodAppContext);
    const location = useLocation();


    if (authLoading || loader || roleLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // If user exists, allow access to the route
    if (user) {
        return children;
    }


    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRouter;