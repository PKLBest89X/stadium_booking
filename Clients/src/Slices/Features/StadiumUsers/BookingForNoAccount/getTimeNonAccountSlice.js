import { createSlice } from "@reduxjs/toolkit";
import { fetchGetTimesToBooking } from "../../../../middlewares/user/fetchBooking/fetchBooking";

const initialState = {
  bookingTimesLoading: false,
  bookingTimesData: [],
  bookingTimesSuccess: null,
  bookingTimesError: null,
  bookingTimesRequestId: undefined,
};

const getTimesSlice = createSlice({
  name: "getStadiumsToBooking",
  initialState,
  reducers: {
    onClearTimes: (state) => {
      state.bookingTimesData = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetTimesToBooking.pending, (state, action) => {
      state.bookingTimesLoading = true;
      if (state.bookingTimesLoading === true) {
        state.bookingTimesRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetTimesToBooking.fulfilled, (state, action) => {
      if (
        state.bookingTimesLoading === true &&
        state.bookingTimesRequestId === action.meta.requestId
      ) {
        state.bookingTimesLoading = false;
        state.bookingTimesRequestId = undefined;
        state.bookingTimesSuccess = true;
        state.bookingTimesData = [];
        state.bookingTimesData = action.payload;
      }
    });
    builder.addCase(fetchGetTimesToBooking.rejected, (state, action) => {
      if (
        state.bookingTimesLoading === true &&
        state.bookingTimesRequestId === action.meta.requestId
      ) {
        state.bookingTimesLoading = false;
        state.bookingTimesRequestId = undefined;
        state.bookingTimesSuccess = false;
        state.bookingTimesError = action.payload;
        state.bookingTimesData = [];
      }
    });
  },
});

export const { onClearTimes } = getTimesSlice.actions;
export default getTimesSlice.reducer;
