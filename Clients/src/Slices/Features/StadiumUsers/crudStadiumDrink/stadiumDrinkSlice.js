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
    extraReducers: {
        [fetchAddStadiumDrink.pending]: (state, action) => {
            state.addDrinkLoading = true;
        },
        [fetchAddStadiumDrink.fulfilled]: (state, action) => {
            state.addDrinkLoading = false;
            state.drinksData.push(action.payload);
        },
        [fetchAddStadiumDrink.rejected]: (state, action) => {
            state.addDrinkLoading = false;
            state.addDrinkError = action.payload
        },
        [fetchUpdateStadiumDrink.pending]: (state, action) => {

        },
        [fetchUpdateStadiumDrink.fulfilled]: (state, action) => {

        },
        [fetchUpdateStadiumDrink.rejected]: (state, action) => {

        },
    },
});

export default stadiumDetailsSlice.reducer;