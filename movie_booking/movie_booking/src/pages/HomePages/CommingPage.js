import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Comming from "../../component/movies-home/Comming/Comming";
import Footer from "../../component/movies-home/Footer/Footer";
const CommingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <Comming/>
            <Footer/>
        </div>
    );
};

export default CommingPage;