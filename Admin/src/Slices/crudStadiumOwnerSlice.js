import { createSlice } from '@reduxjs/toolkit';
import { addStadiumOwner, updateStadiumOwner, deleteStadiumOwner } from '../middlewares/fetchStadiumOwner';

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const crudStadiumOwnerSlice = createSlice({
    name: 'crudSO',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addStadiumOwner.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(addStadiumOwner.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
        })
        builder.addCase(addStadiumOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })       
        builder.addCase(updateStadiumOwner.pending, (state, action) => {

        })
        builder.addCase(updateStadiumOwner.fulfilled, (state, action) => {

        })
        builder.addCase(updateStadiumOwner.rejected, (state, action) => {
            
        })
        builder.addCase(deleteStadiumOwner.pending,(state, action) => {

        })
        builder.addCase(deleteStadiumOwner.fulfilled, (state, action) => {

        })
        builder.addCase(deleteStadiumOwner.rejected, (state, action) => {
            
        })
    },
})

export default crudStadiumOwnerSlice.reducer;