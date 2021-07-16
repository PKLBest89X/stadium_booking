import { createSlice } from "@reduxjs/toolkit";
import { fetchAddBooking } from "../../../../middlewares/user/fetchBooking/fetchBooking";

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
