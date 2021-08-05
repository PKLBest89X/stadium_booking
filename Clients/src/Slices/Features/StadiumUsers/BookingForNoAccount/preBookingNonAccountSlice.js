import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingListDetailsNonAccount, fetchBookingListNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";

const initialState = {
    preBookingNonAccountLoading: false,
    preBookingNonAccountDetailsLoading: false,
    preBookingNonAccountSuccess: null,
    preBookingNonAccountDetailsSuccess: null,
    preBookingNonAccountData: [],
    preBookingNonAccountDetailsData: [],
    preBookingNonAccountError: null,
    preBookingNonAccountDetailsError: null,
    preBookingNonAccountRequestId: undefined,
    preBookingNonAccountDetailsRequestId: undefined,
};

const preBookingNonAccountSlice = createSlice({
    name: 'preBookingNonAccount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(fetchBookingListNonAccount.pending, (state, action) => {
        state.preBookingNonAccountLoading = true;
        if (state.preBookingNonAccountLoading === true) {
          state.preBookingNonAccountRequestId = action.meta.requestId;
        }
      });
      builder.addCase(fetchBookingListNonAccount.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.preBookingNonAccountLoading === true &&
          state.preBookingNonAccountRequestId === requestId
        ) {
          state.preBookingNonAccountSuccess = true;
          state.preBookingNonAccountLoading = false;
          state.preBookingNonAccountRequestId = undefined;
          state.preBookingNonAccountData = [];
          state.preBookingNonAccountData = action.payload;
        }
      });
      builder.addCase(fetchBookingListNonAccount.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.preBookingNonAccountLoading === true &&
          state.preBookingNonAccountRequestId === requestId
        ) {
          state.preBookingNonAccountLoading = false;
          state.preBookingNonAccountSuccess = false;
          state.preBookingNonAccountRequestId = undefined;
          state.preBookingNonAccountError = action.payload;
        }
      });
  
      builder.addCase(fetchBookingListDetailsNonAccount.pending, (state, action) => {
        state.preBookingNonAccountDetailsLoading = true;
        if (state.preBookingNonAccountDetailsLoading === true) {
          state.preBookingNonAccountDetailsRequestId = action.meta.requestId;
        }
      });
      builder.addCase(fetchBookingListDetailsNonAccount.fulfilled, (state, action) => {
        if (
          state.preBookingNonAccountDetailsLoading === true &&
          state.preBookingNonAccountDetailsRequestId === action.meta.requestId
        ) {
          state.preBookingNonAccountDetailsLoading = false;
          state.preBookingNonAccountDetailsRequestId = undefined;
          state.preBookingNonAccountDetailsSuccess = true;
          state.preBookingNonAccountDetailsData = [];
          state.preBookingNonAccountDetailsData = action.payload;
        }
      });
      builder.addCase(fetchBookingListDetailsNonAccount.rejected, (state, action) => {
        if (
          state.preBookingNonAccountDetailsLoading === true &&
          state.preBookingNonAccountDetailsRequestId === action.meta.requestId
        ) {
          state.preBookingNonAccountDetailsLoading = false;
          state.preBookingNonAccountDetailsRequestId = undefined;
          state.preBookingNonAccountDetailsSuccess = false;
          state.preBookingNonAccountDetailsError = action.payload;
          state.preBookingNonAccountDetailsData = [];
        }
      });
    }
});


export default preBookingNonAccountSlice.reducer;