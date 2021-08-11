import { configureStore } from "@reduxjs/toolkit";
import crudStadiumOwnerSlice from "../Slices/crudStadiumOwnerSlice";
import authSlice from "../Slices/Authentication/authSlice";
import allStadiumsSlice from "../Slices/allStadiumsSlice";

import popupSlice from "../Slices/Features/Popup/popupSlice";
import toggleSlice from "../Slices/Features/ToggleDrawer/toggleSlice";
import notificationSlice from "../Slices/Features/Notification/NotificationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    stadiumOwner: crudStadiumOwnerSlice,
    allStadiums: allStadiumsSlice,
    toggle: toggleSlice,
    popup: popupSlice,
    notification: notificationSlice,
  },
});

export default store;
