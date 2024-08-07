import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Showing from "../../component/movies-home/Showing/Showing";
import Footer from "../../component/movies-home/Footer/Footer";
const ShowingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <Showing/>
            <Footer/>
        </div>
    );
};

export default ShowingPage;