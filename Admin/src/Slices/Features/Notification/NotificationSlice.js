import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiName: "",
  notiState: false,
  messageAlert: "",
  messageState: false,
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
    onMessageOpen: (state, { payload }) => {
      state.messageAlert = payload;
      state.messageState = true;
    },
    onMessageClose: (state) => {
      state.messageAlert = "";
      state.messageState = false;
    },
  },
});

export const { onNotiOpen, onNotiClose, onMessageOpen, onMessageClose } =
  notificationSlice.actions;
export default notificationSlice.reducer;
