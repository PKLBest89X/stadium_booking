import { createSlice } from '@reduxjs/toolkit';
import { fetchAddStadium, fetchUpdateStadium } from '../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium';

const initialState = {
    addLoading: false,
    addError: null
};

const crudStadiumSlice = createSlice({
    name: 'crudStadium',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAddStadium.pending]: (state, action) => {
            state.addLoading = true;
        },
        [fetchAddStadium.fulfilled]: (state, action) => {
            state.addLoading = false;
        },
        [fetchAddStadium.rejected]: (state, action) => {
            state.addLoading = false;
            state.addError = action.payload
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