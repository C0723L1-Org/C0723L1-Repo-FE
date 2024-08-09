import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePages/HomePage.js";
import SearchPage from "./pages/HomePages/SearchPage.js";
import ShowingPage from "./pages/HomePages/ShowingPage.js";
import CommingPage from "./pages/HomePages/CommingPage";
import SupportPage from "./pages/HomePages/SupportPage";
import ActorPage from "./pages/HomePages/ActorPage";
import DirectorPage from "./pages/HomePages/DirectorPage";
import StudioPage from "./pages/HomePages/StudioPage";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/search-movie" element={<SearchPage/>} />
                <Route path="/faq" element={<SupportPage/>} />
                <Route path="/showing" element={<ShowingPage/>} />
                <Route path="/comming" element={<CommingPage/>} />
                <Route path="/actor" element={<ActorPage/>} />
                <Route path="/director" element={<DirectorPage/>} />
                <Route path="/studio" element={<StudioPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
