import {GET_USER} from "../action/type-action";

const init =0
const userReducer =(user = init, action) =>{
    const {type, payload} = action
    switch (type) {
        case GET_USER:
            return payload
        default:
            return user
    }
}
export default userReducer;