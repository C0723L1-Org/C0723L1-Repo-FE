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
import UserBookingManagement from "../component/Booking/UserBookingManagement/UserBookingManagement";
import Receipt from "../component/Booking/Receipt";
import Register from "../component/Register/Register";
import Login from "../component/Login/Login";
import ChangePassword from "../component/Information Account/ChangePassword";
import HoSo from "../component/Information Account/HoSo";
import PageDetail from "../component/movies-detail/PageDetail";
import FAQ from "../component/Home/q&a/FAQ";
import ModalFixtureOfMovie from "../component/Booking/ModalFixtureOfMovie";
import SearchMovies from "../pages/Search/SearchMovies";
import ListEmployee from "../component/employee/ListEmployee";
import ListBooking from "../component/Booking/ListBooking";
import {MovieManager} from "../component/movie/MovieManager";
import CreateMovie from "../component/movie/CreateMovie";
import UpdateMovie from "../component/movie/UpdateMovie";
import Rejected from "../pages/NotFound/Rejected";

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
        path: '/faq',
        element: <FAQ />,
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
        path: '/support',
        element: <SupportPage />,
    },
    {
        path: '/movie/:id',
        element: <ModalFixtureOfMovie />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/see-movie-details/:id',
        element: <PageDetail />,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/change-password',
        element: <ChangePassword/>,
        private: true,
    },
    {
        path: '/profile',
        element: <HoSo/>,
        private: true,
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
        private: true,
    },
    {
        path: '/ticket',
        element: <ListBooking />,
        private: true,
    },
    {
        path: '/create-movie',
        element: <CreateMovie />,
    },
    {
        path: '/update-movie/:movieId',
        element: <UpdateMovie />,
    },
    {
        path: '/use-booking-management',
        element: <UserBookingManagement />,
        private: true,
    },
    {
        path: '/movie-manager',
        element: <MovieManager/>,
        private: true
    },
    {
        path: '/rejected',
        element: <Rejected />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;