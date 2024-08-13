import {GET_ALL_SELECTED_SEAT, SET_SEAT} from "../action/type-action";

const init =[]
const seatReducer = (seat = init, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_SEAT:
            return payload
        case GET_ALL_SELECTED_SEAT:
            return [payload,...seat]
    }
}
export default seatReducer;