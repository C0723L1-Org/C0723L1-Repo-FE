import React, { useEffect, useState } from 'react';
import Feed from "../../component/Home/Feed/Feed";
import TopMovies from "../../component/Home/TopMovies/TopMovies";
import MovieShowing from "../../component/Home/Movies/MovieShowing";
import MovieComming from "../../component/Home/Movies/MovieComming";
import Modal from "../../component/Home/Modal/Modal";
import {Main} from "../../layout/main/Main";

const HomePage = () => {
    const [showModal, setShowModal] = useState(true);
    const hideToday = !!localStorage.getItem('hide-today');
    const hideTime = localStorage.getItem('hide-today-time');

    useEffect(() => {
        window.scrollTo(0, 0);

        const now = new Date().getTime();
        const fifteenMinutes = 10 * 60 * 1000;

        if (hideToday && hideTime) {
            const hideTimeMs = parseInt(hideTime, 10);
            if (now - hideTimeMs > fifteenMinutes) {
                localStorage.removeItem('hide-today');
                localStorage.removeItem('hide-today-time');
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        } else {
            setShowModal(true);
            handleHideTodayChange();
        }
    }, []);
    const handleHideTodayChange = () => {
        localStorage.setItem('hide-today', 'true');
        localStorage.setItem('hide-today-time', new Date().getTime().toString());
    };

    return (
        <Main content={
            <div>
                <Feed />
                <TopMovies />
                <MovieShowing />
                <MovieComming />
                <Modal showModal={showModal} setShowModal={setShowModal} />
            </div>
        }/>
    );
};

export default HomePage;
