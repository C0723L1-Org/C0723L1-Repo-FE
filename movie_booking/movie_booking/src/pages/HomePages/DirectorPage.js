import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Director from "../../component/movies-home/Director/Director";
import Footer from "../../component/movies-home/Footer/Footer";
const DirectorPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <Director/>
            <Footer/>
        </div>
    );
};

export default DirectorPage;