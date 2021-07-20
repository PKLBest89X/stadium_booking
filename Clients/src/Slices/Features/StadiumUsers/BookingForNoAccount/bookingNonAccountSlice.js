import { createSlice } from "@reduxjs/toolkit";
import { fetchAddBookingNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";

const initialState = {
  bookingNonAccountLoading: false,
  bookingNonAccountSuccess: null,
  bookingNonAccountData: [],
  bookingNonAccountError: null,
  bookingAccountRequestId: undefined,
};

const bookingNonAccountSlice = createSlice({
  name: "bookingNonAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddBookingNonAccount.pending, (state, action) => {
      state.bookingNonAccountLoading = true;
    });
    builder.addCase(fetchAddBookingNonAccount.fulfilled, (state, action) => {
      state.bookingNonAccountSuccess = true;
      state.bookingNonAccountLoading = false;
      state.bookingNonAccountData = [];
      state.bookingNonAccountData = action.payload;
    });
    builder.addCase(fetchAddBookingNonAccount.rejected, (state, action) => {
      state.bookingNonAccountLoading = false;
      state.bookingNonAccountError = action.payload;
    });
  },
});

export default bookingNonAccountSlice.reducer;
