import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./router/Router";
import PrivateRoute from "./utils/PrivateRoute";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

import {ToastContainer} from "react-toastify";


function App() {
    const initialOptions = {
        clientId: "AQpqoUWuwAhJZxtkl6VGYUzJw-iujAr1mdJhuqp6OGSRhjC4rLLzGf091AHkaNc5ItVnzGZiwv7Eo-M9",
        currency: "USD",
        intent: "capture",
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleBeforeUnload = () => {
            localStorage.removeItem('yourKey'); // Xóa dữ liệu cần thiết
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    return (
        <PayPalScriptProvider options={initialOptions}>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        if (route.private) {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<PrivateRoute element={route.element} />}
                                />
                            );
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        );
                    })}
                </Routes>
                <ToastContainer />
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
