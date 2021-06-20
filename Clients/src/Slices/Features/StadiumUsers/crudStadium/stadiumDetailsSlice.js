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
    extraReducers: {
        [fetchAddStadiumDetails.pending]: (state, action) => {
            state.addStadiumsLoading = true;
        },
        [fetchAddStadiumDetails.fulfilled]: (state, action) => {
            state.addDetailsLoading = false;
            state.stadiumsData.push(action.payload);
        },
        [fetchAddStadiumDetails.rejected]: (state, action) => {
            state.addStadiumsLoading = false;
            state.addStadiumsError = action.payload
        },
        [fetchUpdateStadiumDetails.pending]: (state, action) => {

        },
        [fetchUpdateStadiumDetails.fulfilled]: (state, action) => {

        },
        [fetchUpdateStadiumDetails.rejected]: (state, action) => {

        },
    },
});

export default stadiumDetailsSlice.reducer;