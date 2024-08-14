import {SET_LIST_BOOKING} from "./type-action";
export  const setListBooking =(listBooking) =>  (dispatch)=>{
    dispatch({
        type: SET_LIST_BOOKING,
        payload: listBooking
    })
}
