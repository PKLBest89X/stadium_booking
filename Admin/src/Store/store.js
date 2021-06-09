import { configureStore } from '@reduxjs/toolkit';
import crudStadiumOwnerSlice from '../Slices/crudStadiumOwnerSlice';
import toggleSlice from '../Slices/Features/ToggleDrawer/toggleSlice';

const store = configureStore({
    reducer: {
        stadiumOwner: crudStadiumOwnerSlice,
        toggle: toggleSlice
    }
})

export default store;