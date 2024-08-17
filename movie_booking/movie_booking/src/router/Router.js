import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import Showing from "../pages/Showing/Showing";
import Booking from "../pages/Booking/Booking";
import Actor from "../pages/Actor/Actor";
import Director from "../pages/Director/Director";
import Studio from "../pages/Studio/Studio";
import SupportPage from "../pages/Support/SupportPage";
import SearchMovies from "../pages/Search/SearchMovies";
import SeeMovieDetails from "../component/movies-detail/SeeMovieDetails";
import UserBookingManagement from "../component/booking/UserBookingManagement/UserBookingManagement";
import SeatScreen from "../component/booking/SeatScreen";
import Comming from "../pages/Comming/Comming";
import Receipt from "../component/booking/Receipt";
import ModalFixtureOfMovie from "../component/booking/ModalFixtureOfMovie";

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
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/see-movie-details/:id',
        element: <SeeMovieDetails />,
        exact: true,
    },
    {
        path: '/use-booking-management',
        element: <UserBookingManagement />,
        exact: true,
    },
];

export default routes;