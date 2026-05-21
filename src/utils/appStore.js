import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import turfReducer from "./turfSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        turf: turfReducer,
    }
})

export default appStore;