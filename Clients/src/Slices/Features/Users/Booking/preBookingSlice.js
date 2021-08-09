import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookingListDetails,
  fetchBookingList,
  fetchGetStadiumDetailsBeforeBooking,
} from "../../../../middlewares/user/fetchBooking/fetchBooking";

const initialState = {
  preBookingLoading: false,
  preBookingDetailsLoading: false,
  preStadiumsLoading: false,
  preBookingSuccess: null,
  preBookingDetailsSuccess: null,
  preStadiumsSuccess: null,
  preBookingData: [],
  preBookingDetailsData: [],
  preStadiumsData: [],
  preBookingError: null,
  preBookingDetailsError: null,
  preStadiumsError: null,
  preBookingRequestId: undefined,
  preBookingDetailsRequestId: undefined,
  preStadiumsRequestId: undefined,
};

const preBookingSlice = createSlice({
  name: "preBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ

    builder.addCase(fetchGetStadiumDetailsBeforeBooking.pending, (state, action) => {
      state.preStadiumsLoading = true;
      if (state.preStadiumsLoading === true) {
        state.preStadiumsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumDetailsBeforeBooking.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.preStadiumsLoading === true &&
        state.preStadiumsRequestId === requestId
      ) {
        state.preStadiumsSuccess = true;
        state.preStadiumsLoading = false;
        state.preStadiumsRequestId = undefined;
        state.preStadiumsData = [];
        state.preStadiumsData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumDetailsBeforeBooking.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.preStadiumsLoading === true &&
        state.preStadiumsRequestId === requestId
      ) {
        state.preStadiumsLoading = false;
        state.preStadiumsSuccess = false;
        state.preStadiumsRequestId = undefined;
        state.preStadiumsError = action.payload;
      }
    });


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
  },
});

export default preBookingSlice.reducer;
