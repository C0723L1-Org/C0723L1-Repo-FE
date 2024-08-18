import Navbar from "../Navbar/Navbar";
import React from "react";
import Footer from "../Footer/Footer";
import SpeedDial from "../SpeedDial/SpeedDial";


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