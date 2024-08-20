import "./App.css";
import React, {Suspense, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./router/Router";
import PrivateRoute from "./utils/PrivateRoute";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./component/Booking/Loader";


function App() {
    const initialOptions = {
        clientId: "AQpqoUWuwAhJZxtkl6VGYUzJw-iujAr1mdJhuqp6OGSRhjC4rLLzGf091AHkaNc5ItVnzGZiwv7Eo-M9",
        currency: "USD",
        intent: "capture",
    };


    useEffect(() => {
        window.scrollTo(0, 0);

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
