import { createSlice } from '@reduxjs/toolkit';
import { fetchAddStadium, fetchUpdateStadium } from '../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium';

const initialState = {
    addLoading: false,
    addSuccess: null,
    addError: null
};

const crudStadiumSlice = createSlice({
    name: 'crudStadium',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddStadium.pending, (state, action) => {
            state.addLoading = true;
        })
        builder.addCase(fetchAddStadium.fulfilled, (state, action) => {
            state.addLoading = false;
            state.addSuccess = action.payload
        })
        builder.addCase(fetchAddStadium.rejected, (state, action) => {
            state.addLoading = false;
            state.addError = action.payload
        })
        builder.addCase(fetchUpdateStadium.pending, (state, action) => {

        })
        builder.addCase(fetchUpdateStadium.fulfilled, (state, action) => {

        })
        builder.addCase(fetchUpdateStadium.rejected, (state, action) => {

        })
    },
});

export default crudStadiumSlice.reducer;