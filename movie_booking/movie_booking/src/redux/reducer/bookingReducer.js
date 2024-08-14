import { SET_LIST_BOOKING} from "../action/type-action";

const init =[]
const bookingReducer = (booking = init, action) =>{
    const {type, payload} = action
    switch (type) {
        case SET_LIST_BOOKING:
            return payload;
        default:
            return booking
    }
}
export default bookingReducer;