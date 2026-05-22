import { createSlice } from "@reduxjs/toolkit";

const turfSlice = createSlice({
  name: "turf",
  initialState: [],
  reducers: {
    addTurfs: (state, action) => {
      return action.payload;
    },

    removeTurfs: (state, action) => {
      return state.filter((turf) => turf._id !== action.payload);
    },
  },
});

export const { addTurfs, removeTurfs } = turfSlice.actions;

export default turfSlice.reducer;