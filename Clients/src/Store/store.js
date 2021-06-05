import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from '../Slices/Authentication/registerUserSlice'
import authSlice from '../Slices/Authentication/authSlice';

const store = configureStore({
    reducer: {  
        registerUser: registerUserSlice,
        auth: authSlice
    }
})

export default store;