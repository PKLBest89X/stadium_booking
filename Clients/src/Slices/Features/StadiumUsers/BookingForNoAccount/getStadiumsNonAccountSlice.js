import { createSlice } from "@reduxjs/toolkit";
import { fetchGetStadiumsToBookingNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";

const initialState = {
  bookingStadiumsNonAccountLoading: false,
  bookingStadiumsNonAccountData: [],
  bookingStadiumsNonAccountSuccess: null,
  bookingStadiumsNonAccountError: null,
  bookingStadiumsNonAccountRequestId: undefined,
};

const getStadiumsSliceNonAccount = createSlice({
  name: "getStadiumsToBookingNonAccount",
  initialState,
  reducers: {
    onClearStadiumsNonAccount: (state) => {
      state.bookingStadiumsNonAccountData = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadiumsToBookingNonAccount.pending, (state, action) => {
      state.bookingStadiumsNonAccountLoading = true;
      if (state.bookingStadiumsNonAccountLoading === true) {
        state.bookingStadiumsNonAccountRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumsToBookingNonAccount.fulfilled, (state, action) => {
      if (
        state.bookingStadiumsNonAccountLoading === true &&
        state.bookingStadiumsNonAccountRequestId === action.meta.requestId
      ) {
        state.bookingStadiumsNonAccountLoading = false;
        state.bookingStadiumsNonAccountRequestId = undefined;
        state.bookingStadiumsNonAccountSuccess = true;
        state.bookingStadiumsNonAccountData = [];
        state.bookingStadiumsNonAccountData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumsToBookingNonAccount.rejected, (state, action) => {
      if (
        state.bookingStadiumsNonAccountLoading === true &&
        state.bookingStadiumsNonAccountRequestId === action.meta.requestId
      ) {
        state.bookingStadiumsNonAccountLoading = false;
        state.bookingStadiumsNonAccountRequestId = undefined;
        state.bookingStadiumsNonAccountSuccess = false;
        state.bookingStadiumsNonAccountError = action.payload;
        state.bookingStadiumsNonAccountData = [];
      }
    });
  },
});

export const { onClearStadiumsNonAccount } = getStadiumsSliceNonAccount.actions;
export default getStadiumsSliceNonAccount.reducer;
