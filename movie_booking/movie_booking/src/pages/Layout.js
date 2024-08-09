import React, {useEffect} from 'react';
import Navbar from "../component/movies-home/Navbar/Navbar";
import Footer from "../component/movies-home/Footer/Footer";
import {Outlet} from "react-router-dom";
const Layout = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;