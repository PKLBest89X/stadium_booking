import { createSlice } from '@reduxjs/toolkit';
import { fetchAddStadium, fetchUpdateStadium } from '../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium';

const initialState = {
    loading: false,
    error: ''
};

const crudStadiumSlice = createSlice({
    name: 'crudStadium',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAddStadium.pending]: (state, action) => {

        },
        [fetchAddStadium.fulfilled]: (state, action) => {

        },
        [fetchAddStadium.rejected]: (state, action) => {

        },
        [fetchUpdateStadium.pending]: (state, action) => {

        },
        [fetchUpdateStadium.fulfilled]: (state, action) => {

        },
        [fetchUpdateStadium.rejected]: (state, action) => {

        },
    },
});

export default crudStadiumSlice.reducer;