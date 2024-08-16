import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const jwt = Cookies.get('jwt');
    // return jwt !== undefined && jwt.trim() !== '';
    return true
};


const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;