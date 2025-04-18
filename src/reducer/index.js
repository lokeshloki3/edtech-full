import { combineReducers } from "@reduxjs/toolkit";
import

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
})

export default rootReducer