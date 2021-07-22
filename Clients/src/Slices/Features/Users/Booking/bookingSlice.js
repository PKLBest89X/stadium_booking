import { createSlice } from "@reduxjs/toolkit";
import { fetchAddBooking, fetchGetCurrentBooking } from "../../../../middlewares/user/fetchBooking/fetchBooking";

const initialState = {
  bookingLoading: false,
  bookingSuccess: null,
  bookingData: [],
  bookingError: null,
  bookingRequestId: undefined,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchGetCurrentBooking.pending, (state, action) => {
      state.bookingLoading = true;
      if (state.bookingLoading === true) {
        state.bookingRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetCurrentBooking.fulfilled, (state, action) => {
      if (
        state.bookingLoading === true &&
        state.bookingRequestId === action.meta.requestId
      ) {
        state.bookingLoading = false;
        state.bookingRequestId = undefined;
        state.bookingSuccess = true;
        state.bookingData = [];
        state.bookingData = action.payload;
      }
    });
    builder.addCase(fetchGetCurrentBooking.rejected, (state, action) => {
      if (
        state.bookingLoading === true &&
        state.bookingRequestId === action.meta.requestId
      ) {
        state.bookingLoading = false;
        state.bookingRequestId = undefined;
        state.bookingSuccess = false;
        state.bookingError = action.payload;
        state.bookingData = [];
      }
    });

    builder.addCase(fetchAddBooking.pending, (state, action) => {
      state.bookingLoading = true;
    });
    builder.addCase(fetchAddBooking.fulfilled, (state, action) => {
      state.bookingSuccess = true;
      state.bookingLoading = false;
      state.bookingData = [];
      state.bookingData = action.payload;
    });
    builder.addCase(fetchAddBooking.rejected, (state, action) => {
      state.bookingLoading = false;
      state.bookingError = action.payload;
    });
  },
});

export default bookingSlice.reducer;
