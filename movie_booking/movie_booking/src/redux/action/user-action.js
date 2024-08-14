import request from "../axios-config"
import {GET_USER, SET_SEAT} from "./type-action";
export  const getUser =() => async (dispatch)=>{
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await request.get(`/user/info/${user.id}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (e){
        console.log(e)
    }
}