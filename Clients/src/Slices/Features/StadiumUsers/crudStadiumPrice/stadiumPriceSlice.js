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
    extraReducers: (builder) => {
        builder.addCase(fetchAddStadiumPrice.pending, (state, action) => {
            state.addPriceLoading = true;
        })
        builder.addCase(fetchAddStadiumPrice.fulfilled, (state, action) => {
            state.addDrinkLoading = false;
            state.priceData.push(action.payload);
        })
        builder.addCase(fetchAddStadiumPrice.rejected, (state, action) => {
            state.addPriceLoading = false;
            state.addPriceError = action.payload
        })
        builder.addCase(fetchUpdateStadiumPrice.pending, (state, action) => {

        })
        builder.addCase(fetchUpdateStadiumPrice.fulfilled, (state, action) => {

        })
        builder.addCase(fetchUpdateStadiumPrice.rejected, (state, action) => {

        })
    },
});

export default stadiumDetailsSlice.reducer;