import Navbar from "../../component/Home/Navbar/Navbar";
import React from "react";
import Footer from "../../component/Home/Footer/Footer";


export const Main = ({ content }) => {

    return(
        <div>
            <Navbar></Navbar>
            {content}
            <Footer></Footer>
        </div>
    );
}