import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Actor from "../../component/movies-home/Actor/Actor";
import Footer from "../../component/movies-home/Footer/Footer";
const ActorPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <Actor/>
            <Footer/>
        </div>
    );
};

export default ActorPage;