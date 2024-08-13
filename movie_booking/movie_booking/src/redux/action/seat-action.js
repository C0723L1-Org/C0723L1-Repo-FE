import {GET_ALL_SELECTED_SEAT, SET_SEAT} from "./type-action";
import bookingService from "../service/bookingService";

export  const setSeat =(seat) => async (dispatch)=>{
    try {
        dispatch({
            type:SET_SEAT,
            payload:seat
        })
    }catch (e) {
        console.log(e)
    }
}
export  const getAllSelectedSeat =(showtimeId) => async (dispatch)=>{
    try {
        const res = await  bookingService.getAllSelectedSeat(showtimeId);
        dispatch({
            type:GET_ALL_SELECTED_SEAT,
            payload:res.data
        })
    }catch (e) {
        console.log(e)
    }
}