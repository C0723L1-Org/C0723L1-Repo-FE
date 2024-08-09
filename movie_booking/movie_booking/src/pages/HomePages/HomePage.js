import React, { useEffect, useState } from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import Feed from "../../component/movies-home/Feed/Feed";
import TopMovies from "../../component/movies-home/TopMovies/TopMovies";
import MovieShowing from "../../component/movies-home/Movies/MovieComming";
import MovieComming from "../../component/movies-home/Movies/MovieComming";
import Assess from "../../component/movies-home/Assess/Assess";
import Footer from "../../component/movies-home/Footer/Footer";
import Modal from "../../component/movies-home/Modal/Modal";

const HomePage = () => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const hideToday = localStorage.getItem('hide-today');
        if (!hideToday) {
            setShowModal(true);
        }

    }, []);

    const handleHideTodayChange = (e) => {
        if (e.target.checked) {
            localStorage.setItem('hide-today', 'true');
        } else {
            localStorage.removeItem('hide-today');
        }
    };

    return (
        <div className="no-scrollbar">
            <Feed />
            <TopMovies />
            <MovieShowing />
            <MovieComming />
            <Assess />
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default HomePage;
