import {GET_USER} from "../action/type-action";

const init ={
    user: null,
};
const userReducer =(user = init, action) =>{
    const {type, payload} = action
    switch (type) {
        case GET_USER:
            return  {
            ...user,
            user: payload // assuming action.payload contains the user data
        };
        default:
            return user
    }
}
export default userReducer;