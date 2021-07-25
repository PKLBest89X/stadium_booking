import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiName: "",
  notiState: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    onNotiOpen: (state, { payload }) => {
      state.notiName = payload;
      state.notiState = true;
    },
    onNotiClose: (state) => {
      state.notiName = "";
      state.notiState = false;
    },
  },
});

export const { onNotiOpen, onNotiClose } = notificationSlice.actions;
export default notificationSlice.reducer;
