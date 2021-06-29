import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    onPopupOpen: (state) => {
      state.isOpen = true;
    },
    onPopupClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onPopupOpen, onPopupClose } = popupSlice.actions;
export default popupSlice.reducer;
