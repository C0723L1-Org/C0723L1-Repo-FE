import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import Showing from "../pages/Showing/Showing";
import Booking from "../pages/Booking/Booking";
import Actor from "../pages/Actor/Actor";
import Director from "../pages/Director/Director";
import Studio from "../pages/Studio/Studio";
import SupportPage from "../pages/Support/SupportPage";
import SearchMovies from "../pages/Search/SearchMovies";
import Comming from "../pages/Comming/Comming";
import ModalFixtureOfMovie from "../component/Booking/ModalFixtureOfMovie";
import SeatScreen from "../component/Booking/SeatScreen";
import UserBookingManagement from "../component/Booking/UserBookingManagement/UserBookingManagement";
import Receipt from "../component/Booking/Receipt";
import Register from "../component/Register/Register";
import Login from "../component/Login/Login";
import ChangePassword from "../component/Information Account/ChangePassword";
import HoSo from "../component/Information Account/HoSo";
import PageDetail from "../component/movies-detail/PageDetail";
import FAQ from "../component/Home/q&a/FAQ";


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
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/use-booking-management',
        element: <UserBookingManagement />,
        private: true,
    },
];

export default routes;