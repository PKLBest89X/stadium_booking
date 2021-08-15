import { createSlice } from "@reduxjs/toolkit";
import { fetchCountBooking } from "../../../../middlewares/stadiumUser/fetchDashboard/fetchDashboard";

const initialState = {
  countBookingLoading: false,
  countBookingSuccess: null,
  countBookingData: [],
  countBookingError: null,
  countBookingRequestId: undefined,
};

const countBookingSlice = createSlice({
  name: "countBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountBooking.pending, (state, { meta }) => {
      state.countBookingLoading = true;
      if (state.countBookingLoading === true) {
        state.countBookingRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountBooking.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countBookingLoading === true ||
        state.countBookingRequestId === requestId
      ) {
        state.countBookingLoading = false;
        state.countBookingSuccess = true;
        state.countBookingRequestId = undefined;
        state.countBookingData = [];
        state.countBookingData = action.payload;
      }
    });
    builder.addCase(fetchCountBooking.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countBookingLoading === true ||
        state.countBookingRequestId === requestId
      ) {
        state.countBookingLoading = false;
        state.countBookingSuccess = false;
        state.countBookingRequestId = undefined;
        state.countBookingError = action.payload;
      }
    });
  },
});

export default countBookingSlice.reducer;
