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
    extraReducers: {
        [addStadiumOwner.pending]: (state, action) => {
            state.loading = true;
        },
        [addStadiumOwner.fulfilled]: (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
        },
        [addStadiumOwner.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },        
        [updateStadiumOwner.pending]: (state, action) => {

        },
        [updateStadiumOwner.fulfilled]: (state, action) => {

        },
        [updateStadiumOwner.rejected]: (state, action) => {
            
        },
        [deleteStadiumOwner.pending]: (state, action) => {

        },
        [deleteStadiumOwner.fulfilled]: (state, action) => {

        },
        [deleteStadiumOwner.rejected]: (state, action) => {
            
        }
    },
})

export default crudStadiumOwnerSlice.reducer;