import {REMOVE_SEAT, SET_SEAT,REMOVE_ALL_SEAT} from "./type-action";
import request from "../axios-config"

export  const setSeat =(roomId,seatNumber) => async (dispatch)=> {
    const res = await request.get("/seat/public/seat",
        {
            params:{
                roomId:roomId,
                seatNumber:seatNumber
            }
        })
    dispatch({
        type: SET_SEAT,
        payload: res.data
    })

}
export  const removeSeat =(roomId,seatNumber) => async (dispatch)=> {
    const res = await request.get("/seat/public/seat",
        {
            params:{
                roomId:roomId,
                seatNumber:seatNumber
            }
        })
    dispatch({
        type: REMOVE_SEAT,
        payload: res.data
    })
}
export  const  removeAllSelectedSeat=()=>(dispatch) =>{
    dispatch({
        type: REMOVE_ALL_SEAT,
        payload: []
    })
}

