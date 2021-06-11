import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from '../Slices/Authentication/registerUserSlice'
import authSlice from '../Slices/Authentication/authSlice';
import toggleSlice from '../Slices/Features/ToggleDrawer/toggleSlice';
import crudStadiumSlice from '../Slices/Features/StadiumUsers/crudStadium/crudStadiumSlice';

const store = configureStore({
    reducer: {  
        registerUser: registerUserSlice,
        auth: authSlice,
        toggle: toggleSlice,
        crudStadium: crudStadiumSlice
    }
})

export default store;