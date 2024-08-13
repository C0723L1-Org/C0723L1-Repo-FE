import bookingService from "../service/bookingService";
import {GET_USER} from "./type-action";
export  const setUser =(id) => async (dispatch)=>{
    try {
        const  res = await bookingService.setUser(id)
        dispatch({
            type:GET_USER,
            payload:res.data
        })
    }catch (e) {
        console.log(e)
    }
}