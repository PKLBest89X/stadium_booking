import { createSlice } from '@reduxjs/toolkit';
import { fetchAddStadiumPrice, fetchUpdateStadiumPrice } from '../../../../middlewares/stadiumUser/fetchCRUDStadiumPrice/fetchCRUDStadiumPrice';

const initialState = {
    addPriceLoading: false,
    priceData: [],
    addPriceError: null
};

const stadiumDetailsSlice = createSlice({
    name: 'stadiumPrice',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAddStadiumPrice.pending]: (state, action) => {
            state.addPriceLoading = true;
        },
        [fetchAddStadiumPrice.fulfilled]: (state, action) => {
            state.addDrinkLoading = false;
            state.priceData.push(action.payload);
        },
        [fetchAddStadiumPrice.rejected]: (state, action) => {
            state.addPriceLoading = false;
            state.addPriceError = action.payload
        },
        [fetchUpdateStadiumPrice.pending]: (state, action) => {

        },
        [fetchUpdateStadiumPrice.fulfilled]: (state, action) => {

        },
        [fetchUpdateStadiumPrice.rejected]: (state, action) => {

        },
    },
});

export default stadiumDetailsSlice.reducer;