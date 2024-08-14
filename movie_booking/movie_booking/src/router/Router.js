import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import Showing from "../pages/Showing/Showing";
import Booking from "../pages/Booking/Booking";
import Comming from "../pages/Comming/Comming";
import Actor from "../pages/Actor/Actor";
import Director from "../pages/Director/Director";
import Studio from "../pages/Studio/Studio";
import SupportPage from "../pages/Support/SupportPage";

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
        path: '/login',
        element: <HomePage />,
    },
    {
        path: '/dashboard',
        element: <HomePage />,
        private: true,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;