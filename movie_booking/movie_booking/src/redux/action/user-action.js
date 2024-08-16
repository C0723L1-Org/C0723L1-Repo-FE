import request from "../axios-config"
import {GET_USER, SET_SEAT} from "./type-action";
export  const getUser =() => (dispatch)=>{
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        let userId
        if(user !=null){
            userId = user.id
        } else userId =0
        dispatch({
            type: GET_USER,
            payload: userId
        })
    } catch (e){
        console.log(e)
    }
}