import { createSlice } from '@reduxjs/toolkit';
import { fetchAddStadiumDrink, fetchUpdateStadiumDrink } from '../../../../middlewares/stadiumUser/fetchCRUDStadiumDrink/fetchCRUDStadiumDrink';

const initialState = {
    addDrinkLoading: false,
    drinksData: [],
    addDrinkError: null
};

const stadiumDetailsSlice = createSlice({
    name: 'stadiumDrink',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddStadiumDrink.pending, (state, action) => {
            state.addDrinkLoading = true;
        })
        builder.addCase(fetchAddStadiumDrink.fulfilled, (state, action) => {
            state.addDrinkLoading = false;
            state.drinksData.push(action.payload);
        })
        builder.addCase(fetchAddStadiumDrink.rejected, (state, action) => {
            state.addDrinkLoading = false;
            state.addDrinkError = action.payload
        })
        builder.addCase(fetchUpdateStadiumDrink.pending, (state, action) => {

        })
        builder.addCase(fetchUpdateStadiumDrink.fulfilled, (state, action) => {

        })
        builder.addCase(fetchUpdateStadiumDrink.rejected, (state, action) => {

        })
    },
});

export default stadiumDetailsSlice.reducer;