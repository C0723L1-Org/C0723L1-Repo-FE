import {combineReducers} from "redux";
import seatReducer from "./seatReducer";
import showtimeReducer from "./showtimeReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    seat: seatReducer,
    showtime: showtimeReducer,
    user : userReducer,
})