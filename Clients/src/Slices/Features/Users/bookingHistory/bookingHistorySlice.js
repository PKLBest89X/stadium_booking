import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetHistoryByUser,
  fetchGetHistoryDetailsByUser,
  fetchGetPaidHistoryByUser,
  fetchGetUnPaidHistoryByUser
} from "../../../../middlewares/user/fetchBookingHistory/fetchBookingHistory";
import {
  fetchAvailableCancel,
  fetchCancelBooking,
} from "../../../../middlewares/user/fetchBooking/fetchCancelBooking";
import moment from "moment";

const initialState = {
  bookingHistoryDetailsLoading: false,
  bookingHistoryLoading: false,
  cancelLoading: false,
  cancelSuccess: null,
  cancelError: null,
  cancelRequestId: undefined,
  userPaidLoading: false,
  userPaidSuccess: null,
  userPaidError: null,
  userPaidRequestId: undefined,
  userUnPaidLoading: false,
  userUnPaidSuccess: null,
  userUnPaidError: null,
  userUnPaidRequestId: undefined,
  bookingHistoryData: [],
  bookingHistoryDetailsData: [],
  bookingHistorySuccess: null,
  bookingHistoryError: null,
  bookingHistoryRequestId: undefined,
  bookingHistoryDetailsSuccess: null,
  bookingHistoryDetailsError: null,
  bookingHistoryDetailsRequestId: undefined,
  foundUnCheckoutNonAccount: [],
  filterResultNonAccount: [],
  filterResultByStadiumsNonAccount: [],
  allTimesByStadiumsNonAccount: [],
  stadiumsSelectedNonAccount: "",
  filterByDateDataNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  showBooking: [],
  otherBookingState: null,
  showOtherBooking: [],
  bookingInfo: {
    bookingId: "",
    bookingDate: "",
    bookingCancel: "",
    stadiumName: "",
    stadiumTel: "",
    stadiumLogo: "",
  },
};

const bookingHistorySlice = createSlice({
  name: "getStadiumsToBookingNonAccount",
  initialState,
  reducers: {
    onShowBookingHistory: (state, { payload }) => {
      state.bookingInfo = {
        ...state.bookingInfo,
        bookingId: payload.b_id,
        bookingDate: payload.booking_date,
        bookingCancel: payload.booking_timecancel,
        stadiumName: payload.st_name,
        stadiumTel: payload.phone,
        stadiumLogo: payload.logo,
      };
      state.showBooking = state.bookingHistoryDetailsData.filter(
        (items) =>
          items.b_id === payload.b_id &&
          items.std_id === payload.std_id &&
          items.td_id === payload.td_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let otherDataSameBooking = [];
      otherDataSameBooking = state.bookingHistoryDetailsData.filter(
        (items) => items.b_id === payload.b_id
      );

      state.showOtherBooking = otherDataSameBooking.filter(
        (items1) =>
          !state.showBooking.some(
            (items2) =>
              items1.b_id === items2.b_id &&
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );

      if (state.showOtherBooking.length > 0) {
        state.otherBookingState = true;
      } else {
        state.otherBookingState = false;
      }
    },
    onCancelBooking: (state, { payload }) => {
      let afterDeleted = [];
      afterDeleted = state.bookingHistoryDetailsData.filter(
        (items) => items.b_id !== payload
      );
      if (afterDeleted.length > 0) {
        state.bookingHistoryDetailsData = afterDeleted;
        state.bookingHistoryDetailsSuccess = true;
        state.cancelSuccess = true;
      } else {
        state.bookingHistoryDetailsData = [];
        state.bookingHistoryDetailsSuccess = false;
        state.cancelSuccess = false;
      }
    },
    onFilterBookingForPayment: (state, { payload }) => {
      if (state.filterByDateDataNonAccount !== payload.dateData) {
        state.filterByDateDataNonAccount = payload.dateData;
      }

      if (state.stadiumsSelectedNonAccount !== payload.stadiumId) {
        state.stadiumsSelectedNonAccount = payload.stadiumId;
      }
      state.foundUnCheckoutNonAccount = state.bookingHistoryData.filter(
        (items) =>
          moment(items.kickoff_date).format("YYYY-MM-DD") ===
          state.filterByDateDataNonAccount
      );

      if (state.foundUnCheckoutNonAccount.length > 0) {
        state.filterResultNonAccount = state.bookingHistoryDetailsData.filter(
          (items1) =>
            !state.foundUnCheckoutNonAccount.some(
              (items2) =>
                items1.std_id === items2.std_id && items1.td_id === items2.td_id
            )
        );
        if (state.stadiumsSelectedNonAccount !== "") {
          state.filterResultByStadiumsNonAccount =
            state.filterResultNonAccount.filter(
              (items) => items.std_id === state.stadiumsSelectedNonAccount
            );
        }
      } else {
        if (state.stadiumsSelectedNonAccount !== "") {
          state.allTimesByStadiumsNonAccount =
            state.bookingHistoryDetailsData.filter(
              (items) => items.std_id === state.stadiumsSelectedNonAccount
            );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetHistoryDetailsByUser.pending, (state, action) => {
      state.bookingHistoryDetailsLoading = true;
      if (state.bookingHistoryDetailsLoading === true) {
        state.bookingHistoryDetailsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetHistoryDetailsByUser.fulfilled, (state, action) => {
      if (
        state.bookingHistoryDetailsLoading === true &&
        state.bookingHistoryDetailsRequestId === action.meta.requestId
      ) {
        state.bookingHistoryDetailsLoading = false;
        state.bookingHistoryDetailsRequestId = undefined;
        state.bookingHistoryDetailsSuccess = true;
        state.bookingHistoryDetailsData = [];
        state.bookingHistoryDetailsData = action.payload;
      }
    });
    builder.addCase(fetchGetHistoryDetailsByUser.rejected, (state, action) => {
      if (
        state.bookingHistoryDetailsLoading === true &&
        state.bookingHistoryDetailsRequestId === action.meta.requestId
      ) {
        state.bookingHistoryDetailsLoading = false;
        state.bookingHistoryDetailsRequestId = undefined;
        state.bookingHistoryDetailsSuccess = false;
        state.bookingHistoryDetailsError = action.payload;
        state.bookingHistoryDetailsData = [];
      }
    });

    //ການຈອງທີ່ຍົກເລີກໄດ້
    builder.addCase(fetchAvailableCancel.pending, (state, action) => {
      state.cancelLoading = true;
      if (state.cancelLoading === true) {
        state.cancelRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchAvailableCancel.fulfilled, (state, action) => {
      if (
        state.cancelLoading === true &&
        state.cancelRequestId === action.meta.requestId
      ) {
        state.cancelLoading = false;
        state.cancelRequestId = undefined;
        state.cancelSuccess = true;
        state.bookingHistoryDetailsData = [];
        state.bookingHistoryDetailsData = action.payload;
      }
    });
    builder.addCase(fetchAvailableCancel.rejected, (state, action) => {
      if (
        state.cancelLoading === true &&
        state.cancelRequestId === action.meta.requestId
      ) {
        state.cancelLoading = false;
        state.cancelRequestId = undefined;
        state.cancelSuccess = false;
        state.cancelError = action.payload;
        state.bookingHistoryDetailsData = [];
      }
    });

    //ຍົກເລີກການຈອງ
    builder.addCase(fetchCancelBooking.pending, (state, action) => {
      state.bookingHistoryDetailsLoading = true;
    });
    builder.addCase(fetchCancelBooking.fulfilled, (state, action) => {
      state.bookingHistoryDetailsLoading = false;
      state.bookingHistoryDetailsSuccess = true;
      state.cancelSuccess = true;
    });
    builder.addCase(fetchCancelBooking.rejected, (state, action) => {
      state.bookingHistoryDetailsLoading = false;
      state.bookingHistoryDetailsError = action.payload;
    });

    //ລາຍການຈອງທີ່ໄດ້ຈ່າຍແລ້ວ
    builder.addCase(fetchGetPaidHistoryByUser.pending, (state, action) => {
      state.userPaidLoading = true;
      if (state.userPaidLoading === true) {
        state.userPaidRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetPaidHistoryByUser.fulfilled, (state, action) => {
      if (
        state.userPaidLoading === true &&
        state.userPaidRequestId === action.meta.requestId
      ) {
        state.userPaidLoading = false;
        state.userPaidRequestId = undefined;
        state.userPaidSuccess = true;
        state.bookingHistoryDetailsData = [];
        state.bookingHistoryDetailsData = action.payload;
      }
    });
    builder.addCase(fetchGetPaidHistoryByUser.rejected, (state, action) => {
      if (
        state.userPaidLoading === true &&
        state.userPaidRequestId === action.meta.requestId
      ) {
        state.userPaidLoading = false;
        state.userPaidRequestId = undefined;
        state.userPaidSuccess = false;
        state.userPaidError = action.payload;
        state.bookingHistoryDetailsData = [];
      }
    });

    //ລາຍການຈອງທີ່ບໍ່ໄດ້ຈ່າຍ
    builder.addCase(fetchGetUnPaidHistoryByUser.pending, (state, action) => {
      state.userUnPaidLoading = true;
      if (state.userUnPaidLoading === true) {
        state.userUnPaidRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetUnPaidHistoryByUser.fulfilled, (state, action) => {
      if (
        state.userUnPaidLoading === true &&
        state.userUnPaidRequestId === action.meta.requestId
      ) {
        state.userUnPaidLoading = false;
        state.userUnPaidRequestId = undefined;
        state.userUnPaidSuccess = true;
        state.bookingHistoryDetailsData = [];
        state.bookingHistoryDetailsData = action.payload;
      }
    });
    builder.addCase(fetchGetUnPaidHistoryByUser.rejected, (state, action) => {
      if (
        state.userUnPaidLoading === true &&
        state.userUnPaidRequestId === action.meta.requestId
      ) {
        state.userUnPaidLoading = false;
        state.userUnPaidRequestId = undefined;
        state.userUnPaidSuccess = false;
        state.userUnPaidError = action.payload;
        state.bookingHistoryDetailsData = [];
      }
    });
  },
});

export const { onShowBookingHistory, onCancelBooking } =
  bookingHistorySlice.actions;
export default bookingHistorySlice.reducer;
