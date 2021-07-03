import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupName: "",
  isOpen: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    onPopupOpen: (state, { payload }) => {
      state.popupName = payload;
      state.isOpen = true;
    },
    onPopupClose: (state) => {
      state.popupName = "";
      state.isOpen = false;
    },
  },
});

export const { onPopupOpen, onPopupClose } = popupSlice.actions;
export default popupSlice.reducer;
