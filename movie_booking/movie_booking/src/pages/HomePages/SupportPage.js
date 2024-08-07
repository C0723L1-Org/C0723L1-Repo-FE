import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import FAQ from "../../component/movies-home/q&a/FAQ";
import Comments from "../../component/movies-home/Support/Comments";
import Footer from "../../component/movies-home/Footer/Footer";
const SupportPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <FAQ/>
            <Comments/>
            <Footer/>
        </div>
    );
};

export default SupportPage;