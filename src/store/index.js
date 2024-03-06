import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { imttrReducers } from "./reducer/reducer";


const imtrr = combineReducers({
    imtrrReducer: imttrReducers
})

const store = configureStore({ reducer: imtrr });
export default store; 