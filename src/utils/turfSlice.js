import { createSlice } from "@reduxjs/toolkit";

const turfSlice = createSlice({
    name: "turf",
    initialState: null,
    reducers: {
        addTurfs: (state, action) => {
            return action.payload;
        },
        removeTurfs: (state,action) => {
            return null;
        },
    },
});

export const {addTurfs,removeTurfs} = turfSlice.actions;
export default turfSlice.reducer;