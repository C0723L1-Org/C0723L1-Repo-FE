import {GET_USER} from "./type-action";
export  const setUser =(user) => (dispatch)=>{
        dispatch({
            type: GET_USER,
            payload: user
        })
}