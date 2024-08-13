import { SET_SEAT} from "../action/type-action";

const init =[]
const userReducer = (user = init, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_SEAT:
            return payload

    }
}
export default userReducer;