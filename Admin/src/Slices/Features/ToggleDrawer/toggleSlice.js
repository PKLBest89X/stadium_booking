import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smUp: false,
  smDown: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    onSmUpOpen: (state, action) => {
      state.smUp = action.payload;
    },
    onSmUpClose: (state, action) => {
      state.smUp = false;
    },
    onSmDownOpen: (state, action) => {
      state.smDown = action.payload;
    },
    onSmDownClose: (state, action) => {
      state.smDown = false;
    },
  },
});

export const { onSmUpOpen, onSmUpClose, onSmDownOpen, onSmDownClose } =
  toggleSlice.actions;
export default toggleSlice.reducer;
