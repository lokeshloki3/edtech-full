import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // cart: localStorage.getItem("cart")
    //     ? JSON.parse(localStorage.getItem("cart"))
    //     : [],
    // total: localStorage.getItem("total")
    //     ? JSON.parse(localStorage.getItem("total"))
    //     : 0,
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.user = value.payload;
        },
        // add to cart
        // remove from cart
        // reset cart
        // addToCart: (state, value) => {
        //     const course = action.payload;
        //     const index = state.cart.findIndex((item) => item._id === course._id);
        // }
    },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;