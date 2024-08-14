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
