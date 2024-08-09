import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Footer from "../../component/movies-home/Footer/Footer";
import Studio from "../../component/movies-home/Studio/Studio";
const StudioPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <Studio/>
            <Footer/>
        </div>
    );
};

export default StudioPage;