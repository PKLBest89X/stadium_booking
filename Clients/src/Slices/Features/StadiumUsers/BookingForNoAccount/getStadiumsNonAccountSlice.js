import { createSlice } from "@reduxjs/toolkit";
import { fetchGetStadiumsToBooking } from "../../../../middlewares/user/fetchBooking/fetchBooking";

const initialState = {
  bookingStadiumsLoading: false,
  bookingStadiumsData: [],
  bookingStadiumsSuccess: null,
  bookingStadiumsError: null,
  bookingStadiumsRequestId: undefined,
};

const getStadiumsSlice = createSlice({
  name: "getStadiumsToBooking",
  initialState,
  reducers: {
    onClearStadiums: (state) => {
      state.bookingStadiumsData = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadiumsToBooking.pending, (state, action) => {
      state.bookingStadiumsLoading = true;
      if (state.bookingStadiumsLoading === true) {
        state.bookingStadiumsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumsToBooking.fulfilled, (state, action) => {
      if (
        state.bookingStadiumsLoading === true &&
        state.bookingStadiumsRequestId === action.meta.requestId
      ) {
        state.bookingStadiumsLoading = false;
        state.bookingStadiumsRequestId = undefined;
        state.bookingStadiumsSuccess = true;
        state.bookingStadiumsData = [];
        state.bookingStadiumsData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumsToBooking.rejected, (state, action) => {
      if (
        state.bookingStadiumsLoading === true &&
        state.bookingStadiumsRequestId === action.meta.requestId
      ) {
        state.bookingStadiumsLoading = false;
        state.bookingStadiumsRequestId = undefined;
        state.bookingStadiumsSuccess = false;
        state.bookingStadiumsError = action.payload;
        state.bookingStadiumsData = [];
      }
    });
  },
});

export const { onClearStadiums } = getStadiumsSlice.actions;
export default getStadiumsSlice.reducer;
