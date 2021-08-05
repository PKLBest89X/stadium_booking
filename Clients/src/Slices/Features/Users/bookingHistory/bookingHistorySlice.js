import { createSlice } from "@reduxjs/toolkit";
import { fetchGetHistoryByUser, fetchGetHistoryDetailsByUser } from "../../../../middlewares/user/fetchBookingHistory/fetchBookingHistory";
import moment from "moment";

const initialState = {
  bookingHistoryDetailsLoading: false,
  bookingHistoryLoading: false,
  bookingHistoryData: [],
  bookingHistoryDetailsData: [],
  foundUnCheckoutNonAccount: [],
  filterResultNonAccount: [],
  filterResultByStadiumsNonAccount: [],
  allTimesByStadiumsNonAccount: [],
  stadiumsSelectedNonAccount: "",
  filterByDateDataNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  bookingHistorySuccess: null,
  bookingHistoryError: null,
  bookingHistoryRequestId: undefined,
  bookingHistoryDetailsSuccess: null,
  bookingHistoryDetailsError: null,
  bookingHistoryDetailsRequestId: undefined,
  customerInfo: {
    bookingId: "",
    customerfirstName: "",
    customerlastName: "",
    customerType: "",
    customerTel: "",
  },
};

const bookingHistorySlice = createSlice({
  name: "getStadiumsToBookingNonAccount",
  initialState,
  reducers: {
    onClearBookingForPayment: (state) => {
      state.bookingHistoryDetailsData = [];
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
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(fetchGetHistoryByUser.pending, (state, action) => {
      state.bookingHistoryLoading = true;
      if (state.bookingHistoryLoading === true) {
        state.bookingHistoryRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetHistoryByUser.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.bookingHistoryLoading === true &&
        state.bookingHistoryRequestId === requestId
      ) {
        state.bookingHistorySuccess = true;
        state.bookingHistoryLoading = false;
        state.bookingHistoryRequestId = undefined;
        state.bookingHistoryData = [];
        state.bookingHistoryData = action.payload;
      }
    });
    builder.addCase(fetchGetHistoryByUser.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.bookingHistoryLoading === true &&
        state.bookingHistoryRequestId === requestId
      ) {
        state.bookingHistoryLoading = false;
        state.bookingHistorySuccess = false;
        state.bookingHistoryRequestId = undefined;
        state.bookingHistoryError = action.payload;
      }
    });

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
  },
});

export const {
  onClearBookingForPayment,
  onFilterBookingForPayment,
} = bookingHistorySlice.actions;
export default bookingHistorySlice.reducer;
