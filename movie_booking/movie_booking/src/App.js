import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePages/HomePage.js";
import SupportPage from "./pages/HomePages/SupportPage";
import SearchMovies from "./component/movies-home/Search/SearchMovies";
import Showing from "./component/movies-home/Showing/Showing";
import Comming from "./component/movies-home/Comming/Comming";
import Actor from "./component/movies-home/Actor/Actor";
import Director from "./component/movies-home/Director/Director";
import Layout from "./pages/Layout";
import Studio from "./component/movies-home/Studio/Studio";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/search-movie" element={<SearchMovies/>} />
                <Route path="/faq" element={<SupportPage/>} />
                <Route path="/showing" element={<Showing/>} />
                <Route path="/booking" element={<Showing/>} />
                <Route path="/comming" element={ <Comming/>} />
                <Route path="/actor" element={<Actor/>} />
                <Route path="/director" element={<Director/>} />
                <Route path="/studio" element={<Studio/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
