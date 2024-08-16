import {SET_SHOWTIME} from "./type-action";

export  const setShowtime =(showtime) => async (dispatch)=>{
    try {
        dispatch({
            type:SET_SHOWTIME,
            payload:showtime
        })
    }catch (e) {
        console.log(e)
    }
}