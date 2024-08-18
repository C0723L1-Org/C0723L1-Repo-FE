import Navbar from "../../component/Home/Navbar/Navbar";
import React from "react";
import Footer from "../../component/Home/Footer/Footer";
import SpeedDial from "../../component/Home/SpeedDial/SpeedDial";


export const Main = ({ content }) => {

    return(
        <div>
            <Navbar></Navbar>
            {content}
            <SpeedDial></SpeedDial>
            <Footer></Footer>
        </div>
    );
}