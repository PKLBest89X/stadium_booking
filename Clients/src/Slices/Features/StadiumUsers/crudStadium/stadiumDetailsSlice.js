import { createSlice } from '@reduxjs/toolkit';
import { fetchAddStadiumDetails, fetchUpdateStadiumDetails } from '../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails';

const initialState = {
    addStadiumsLoading: false,
    stadiumsData: [],
    addStadiumsError: null
};

const stadiumDetailsSlice = createSlice({
    name: 'stadiumDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddStadiumDetails.pending, (state, action) => {
            state.addStadiumsLoading = true;
        })
        builder.addCase(fetchAddStadiumDetails.fulfilled, (state, action) => {
            state.addDetailsLoading = false;
            state.stadiumsData.push(action.payload);
        })
        builder.addCase(fetchAddStadiumDetails.rejected, (state, action) => {
            state.addStadiumsLoading = false;
            state.addStadiumsError = action.payload
        })
        builder.addCase(fetchUpdateStadiumDetails.pending, (state, action) => {

        })
        builder.addCase(fetchUpdateStadiumDetails.fulfilled, (state, action) => {

        })
        builder.addCase(fetchUpdateStadiumDetails.rejected, (state, action) => {

        })
    },
});

export default stadiumDetailsSlice.reducer;