import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import Showing from "../pages/Showing/Showing";
import Booking from "../pages/Booking/Booking";
import Comming from "../pages/Comming/Comming";
import Actor from "../pages/Actor/Actor";
import Director from "../pages/Director/Director";
import Studio from "../pages/Studio/Studio";
import SupportPage from "../pages/Support/SupportPage";
import SeatScreen from "../component/Booking/SeatScreen";
import Receipt from "../component/Booking/Receipt";
import ModalFixtureOfMovie from "../component/Booking/ModalFixtureOfMovie";
import SearchMovies from "../pages/Search/SearchMovies";
import ListEmployee from "../component/employee/ListEmployee";
import ListBooking from "../component/Booking/ListBooking";
import {MovieManager} from "../component/movie/MovieManager";
import CreateMovie from "../component/movie/CreateMovie";
import UpdateMovie from "../component/movie/UpdateMovie";

const routes = [
    {
        path: '/',
        element: <HomePage />,
        exact: true,
    },
    {
        path: '/showing',
        element: <Showing />,
    },
    {
        path: '/search-movie',
        element: <SearchMovies />,
    },
    {
        path: '/comming',
        element: <Comming />,
    },
    {
        path: '/Booking',
        element: <Booking />,
    },
    {
        path: '/actor',
        element: <Actor />,
    },
    {
        path: '/director',
        element: <Director />,
    },
    {
        path: '/studio',
        element: <Studio/>,
    },
    {
        path: '/faq',
        element: <SupportPage />,
    },
    {
        path: '/movie/:id',
        element: <ModalFixtureOfMovie />,
    },
    {
        path: '/login',
        element: <HomePage />,
    },
    {
        path: '/seat/:id',
        element: <SeatScreen />,
        private: true,
    },
    {
        path: '/receipt/:id',
        element: <Receipt />,
        private: true,
    },
    {
        path: '/employee',
        element: <ListEmployee />,
        // private: true,
    },
    {
        path: '/ticket',
        element: <ListBooking />,
        // private: true,
    },
    {
        path: '/create-movie',
        element: <CreateMovie />,
    },
    {
        path: '//update-movie/:movieId',
        element: <UpdateMovie />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
    {
    path: '/movie-manager',
    element: <MovieManager/>
    }
];

export default routes;