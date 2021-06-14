import { configureStore } from '@reduxjs/toolkit';
import registerUserSlice from '../Slices/Authentication/registerUserSlice'
import authSlice from '../Slices/Authentication/authSlice';
import toggleSlice from '../Slices/Features/ToggleDrawer/toggleSlice';
import crudStadiumSlice from '../Slices/Features/StadiumUsers/crudStadium/crudStadiumSlice';
import checkValidDataSlice from '../Slices/Features/CheckValidData/checkValidDataSlice';
import postSlice from '../Slices/Features/StadiumUsers/post/postSlice';

const store = configureStore({
    reducer: {  
        registerUser: registerUserSlice,
        auth: authSlice,
        toggle: toggleSlice,
        crudStadium: crudStadiumSlice,
        validData: checkValidDataSlice,
        posts: postSlice
    }
})

export default store;