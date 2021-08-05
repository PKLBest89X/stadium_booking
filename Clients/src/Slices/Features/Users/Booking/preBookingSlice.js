import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingListDetails, fetchBookingList } from "../../../../middlewares/user/fetchBooking/fetchBooking";

const initialState = {
    preBookingLoading: false,
    preBookingDetailsLoading: false,
    preBookingSuccess: null,
    preBookingDetailsSuccess: null,
    preBookingData: [],
    preBookingDetailsData: [],
    preBookingError: null,
    preBookingDetailsError: null,
    preBookingRequestId: undefined,
    preBookingDetailsRequestId: undefined,
};

const preBookingSlice = createSlice({
    name: 'preBooking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(fetchBookingList.pending, (state, action) => {
        state.preBookingLoading = true;
        if (state.preBookingLoading === true) {
          state.preBookingRequestId = action.meta.requestId;
        }
      });
      builder.addCase(fetchBookingList.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.preBookingLoading === true &&
          state.preBookingRequestId === requestId
        ) {
          state.preBookingSuccess = true;
          state.preBookingLoading = false;
          state.preBookingRequestId = undefined;
          state.preBookingData = [];
          state.preBookingData = action.payload;
        }
      });
      builder.addCase(fetchBookingList.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.preBookingLoading === true &&
          state.preBookingRequestId === requestId
        ) {
          state.preBookingLoading = false;
          state.preBookingSuccess = false;
          state.preBookingRequestId = undefined;
          state.preBookingError = action.payload;
        }
      });
  
      builder.addCase(fetchBookingListDetails.pending, (state, action) => {
        state.preBookingDetailsLoading = true;
        if (state.preBookingDetailsLoading === true) {
          state.preBookingDetailsRequestId = action.meta.requestId;
        }
      });
      builder.addCase(fetchBookingListDetails.fulfilled, (state, action) => {
        if (
          state.preBookingDetailsLoading === true &&
          state.preBookingDetailsRequestId === action.meta.requestId
        ) {
          state.preBookingDetailsLoading = false;
          state.preBookingDetailsRequestId = undefined;
          state.preBookingDetailsSuccess = true;
          state.preBookingDetailsData = [];
          state.preBookingDetailsData = action.payload;
        }
      });
      builder.addCase(fetchBookingListDetails.rejected, (state, action) => {
        if (
          state.preBookingDetailsLoading === true &&
          state.preBookingDetailsRequestId === action.meta.requestId
        ) {
          state.preBookingDetailsLoading = false;
          state.preBookingDetailsRequestId = undefined;
          state.preBookingDetailsSuccess = false;
          state.preBookingDetailsError = action.payload;
          state.preBookingDetailsData = [];
        }
      });
    }
});


export default preBookingSlice.reducer;