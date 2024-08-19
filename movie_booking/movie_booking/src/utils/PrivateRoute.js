import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";



const PrivateRoute = ({ element }) => {
    const user = useSelector(state => state.user.user)
    console.log("private router :"+ user != null)
    return user != null ? element : <Navigate to="/login" />;
};

export default PrivateRoute;