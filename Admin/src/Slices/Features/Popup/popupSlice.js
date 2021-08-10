import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupName: "",
  isOpen: false,
  tabName: "",
  tabOpen: false,
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
    onTabOpen: (state, { payload }) => {
      state.tabName = payload;
      state.tabOpen = true;
    },
    onTabClose: (state) => {
      state.tabName = "";
      state.tabOpen = false;
    },
  },
});

export const { onPopupOpen, onPopupClose, onTabOpen, onTabClose } =
  popupSlice.actions;
export default popupSlice.reducer;
