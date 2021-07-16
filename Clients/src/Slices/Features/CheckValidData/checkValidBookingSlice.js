import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckBooking } from "../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";

const initialState = {
  checkBookingLoading: false,
  checkBookingResult: null,
};

const validBookingDataSlice = createSlice({
  name: "validBookingData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckBooking.pending, (state, action) => {
      state.checkBookingLoading = true;
    });
    builder.addCase(fetchCheckBooking.fulfilled, (state, action) => {
      state.checkBookingLoading = false;
      state.checkBookingResult = action.payload;
    });
    builder.addCase(fetchCheckBooking.rejected, (state, action) => {
      state.checkBookingLoading = false;
      state.checkBookingResult = action.payload;
    });
  },
});

export default validBookingDataSlice.reducer;