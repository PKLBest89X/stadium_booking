import { configureStore } from '@reduxjs/toolkit';
import crudStadiumOwnerSlice from '../Slices/crudStadiumOwnerSlice';

const store = configureStore({
    reducer: {
        stadiumOwner: crudStadiumOwnerSlice
    }
})

export default store;