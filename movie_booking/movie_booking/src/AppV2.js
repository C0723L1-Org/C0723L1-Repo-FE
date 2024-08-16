import {Provider} from "react-redux";
import store from "./redux/store";
import SeatScreen from "./component/booking/SeatScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./component/movies-home/Navbar/Navbar";

import ModalFixtureOfMovie from "./component/booking/ModalFixtureOfMovie";
import Receipt from "./component/booking/Receipt";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

function AppV2() {
    const initialOptions = {
        clientId: "AQpqoUWuwAhJZxtkl6VGYUzJw-iujAr1mdJhuqp6OGSRhjC4rLLzGf091AHkaNc5ItVnzGZiwv7Eo-M9",
        currency: "USD",
        intent: "capture",
    };

    return (

        <Provider store={store}>
            <PayPalScriptProvider options={initialOptions}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar/>}>
                            <Route path="/movie/:id" element={<ModalFixtureOfMovie/>}/>
                            <Route path="/seat/:id" element={<SeatScreen/>}/>
                            <Route path="/receipt/:id" element={<Receipt/>}/>
                        </Route>
                        {/*<Route path="*" element={<PageNotFound/>}/>*/}
                    </Routes>
                    <Routes>

                    </Routes>
                </BrowserRouter>
            </PayPalScriptProvider>
        </Provider>
    );
}
export default AppV2;
