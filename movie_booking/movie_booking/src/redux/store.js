import {thunk} from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducer/combine-reducer";

const  initStore = {}
const middleWare =[thunk]
const store = createStore(
    rootReducer,
    initStore,
    applyMiddleware(...middleWare)
)
export default store