import React from 'react';
import { Navigate } from 'react-router-dom';
const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return !!user;
};


const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;