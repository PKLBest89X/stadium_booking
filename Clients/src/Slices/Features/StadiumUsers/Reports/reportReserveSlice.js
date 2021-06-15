import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reportReserveLoading: false,
    reportReserveData: [],
    reportReserveError: null
}

const reportReserveSlice = createSlice({
    name: 'reportReserve',
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

export default reportReserveSlice.reducer;