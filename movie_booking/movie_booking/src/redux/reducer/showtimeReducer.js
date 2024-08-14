import {SET_SHOWTIME} from "../action/type-action";

const init =[]
const showtimeReducer = (showtime = init, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_SHOWTIME:
            return payload
        default:
            return showtime
    }
}
export default showtimeReducer;