import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./router/Router";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFound/NotFound";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";


function App() {

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

                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
