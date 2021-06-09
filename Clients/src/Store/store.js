import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from '../Slices/Authentication/registerUserSlice'
import authSlice from '../Slices/Authentication/authSlice';
import toggleSlice from '../Slices/Features/ToggleDrawer/toggleSlice';

const store = configureStore({
    reducer: {  
        registerUser: registerUserSlice,
        auth: authSlice,
        toggle: toggleSlice
    }
})

export default store;