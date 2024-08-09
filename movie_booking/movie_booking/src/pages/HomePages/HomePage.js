import React, { useEffect, useState } from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Feed from "../../component/movies-home/Feed/Feed";
import TopMovies from "../../component/movies-home/TopMovies/TopMovies";
import MovieComming from "../../component/movies-home/Movies/MovieComming";
import Footer from "../../component/movies-home/Footer/Footer";
import Modal from "../../component/movies-home/Modal/Modal";
import MovieShowing from "../../component/movies-home/Movies/MovieShowing";

const HomePage = () => {
    const [showModal, setShowModal] = useState(true);
    const hideToday = !!localStorage.getItem('hide-today');
    useEffect(() => {
        window.scrollTo(0, 0);
        if ( !hideToday ) {
            console.log("Show Modal")
            setShowModal(true);
            handleHideTodayChange();
        }else{
            console.log("Hide Modal")
            setShowModal(false);
            localStorage.removeItem('hide-today');
        }

    }, []);

    const handleHideTodayChange = () => {
            console.log("create localStore")
            localStorage.setItem('hide-today', 'true');
    };

    return (
        <div className="no-scrollbar">
            <Navbar />
            <Feed />
            <TopMovies />
            <MovieShowing />
            <MovieComming />
            <Footer />
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default HomePage;
