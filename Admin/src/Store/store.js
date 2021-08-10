import { configureStore } from '@reduxjs/toolkit';
import crudStadiumOwnerSlice from '../Slices/crudStadiumOwnerSlice';
import toggleSlice from '../Slices/Features/ToggleDrawer/toggleSlice';
import authSlice from '../Slices/Authentication/authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        stadiumOwner: crudStadiumOwnerSlice,
        toggle: toggleSlice
    }
})

export default store;