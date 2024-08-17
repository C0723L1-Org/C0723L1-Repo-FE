import {REMOVE_ALL_SEAT, REMOVE_SEAT, SET_SEAT} from "../action/type-action";

const init =[]
const seatReducer = (seat = init, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_SEAT:
            const exists = seat.some(s => s.seatNumber === payload.seatNumber);
            if (!exists) {
                return [payload,...seat];
            }
            return seat;
        case REMOVE_SEAT:
            return seat.filter(seat => seat.seatNumber !== payload.seatNumber)
        case REMOVE_ALL_SEAT:
            return []
        default:
            return seat
    }
}
export default seatReducer;