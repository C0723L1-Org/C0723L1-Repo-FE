import React, {useEffect} from 'react';
import Navbar from "../../component/movies-home/Navbar/Navbar";
import SearchMovies from "../../component/movies-home/Movies_list/SearchMovies";
import Footer from "../../component/movies-home/Footer/Footer";
const SearchPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar/>
            <SearchMovies/>
            <Footer/>
        </div>
    );
};

export default SearchPage;