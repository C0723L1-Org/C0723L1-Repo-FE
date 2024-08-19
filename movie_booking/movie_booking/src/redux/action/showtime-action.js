import {SET_SHOWTIME,REMOVE_SHOWTIME} from "./type-action";

export  const setShowtime =(showtime) => async (dispatch)=>{
        dispatch({
            type:SET_SHOWTIME,
            payload:showtime
        })

}
export const removeShowtime = (dispatch)=>{
        dispatch({
            type:REMOVE_SHOWTIME,
            payload:{}
        })
}