import { createSlice } from "@reduxjs/toolkit";

// load only that values in initial state which are required as app will slow
// use localStorage for token as it will stay even after browser close
const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};