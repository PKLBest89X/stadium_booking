import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetTimesToBookingNonAccount,
  fetchGetBookingDetailsUnCheckoutNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import moment from "moment";

const initialState = {
  bookingTimesNonAccountLoading: false,
  bookingUnCheckoutNonAccountLoading: false,
  bookingUnCheckoutNonAccountData: [],
  bookingTimesNonAccountData: [],
  foundUnCheckoutNonAccount: [],
  filterResultNonAccount: [],
  filterResultByStadiumsNonAccount: [],
  allTimesByStadiumsNonAccount: [],
  stadiumsSelectedNonAccount: "",
  filterByDateDataNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  bookingUnCheckoutNonAccountSuccess: null,
  bookingUnCheckoutNonAccountError: null,
  bookingUnCheckoutNonAccountRequestId: undefined,
  bookingTimesNonAccountSuccess: null,
  bookingTimesNonAccountError: null,
  bookingTimesNonAccountRequestId: undefined,
};

const getTimesSliceNonAccount = createSlice({
  name: "getStadiumsToBookingNonAccount",
  initialState,
  reducers: {
    onClearTimesNonAccount: (state) => {
      state.bookingTimesNonAccountData = [];
    },
    onFilterAvailableTimesNonAccount: (state, { payload }) => {
      if (state.filterByDateDataNonAccount !== payload.dateData) {
        state.filterByDateDataNonAccount = payload.dateData;
      }

      if (state.stadiumsSelectedNonAccount !== payload.stadiumId) {
        state.stadiumsSelectedNonAccount = payload.stadiumId;
      }
      state.foundUnCheckoutNonAccount =
        state.bookingUnCheckoutNonAccountData.filter(
          (items) =>
            moment(items.kickoff_date).format("YYYY-MM-DD") ===
            state.filterByDateDataNonAccount
        );

      if (state.foundUnCheckoutNonAccount.length > 0) {
        state.filterResultNonAccount = state.bookingTimesNonAccountData.filter(
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
            state.bookingTimesNonAccountData.filter(
              (items) => items.std_id === state.stadiumsSelectedNonAccount
            );
        }
      }
    },
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(
      fetchGetBookingDetailsUnCheckoutNonAccount.pending,
      (state, action) => {
        state.bookingUnCheckoutNonAccountLoading = true;
        if (state.bookingUnCheckoutNonAccountLoading === true) {
          state.bookingUnCheckoutNonAccountRequestId = action.meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchGetBookingDetailsUnCheckoutNonAccount.fulfilled,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.bookingUnCheckoutNonAccountLoading === true &&
          state.bookingUnCheckoutNonAccountRequestId === requestId
        ) {
          state.bookingUnCheckoutNonAccountSuccess = true;
          state.bookingUnCheckoutNonAccountLoading = false;
          state.bookingUnCheckoutNonAccountRequestId = undefined;
          state.bookingUnCheckoutNonAccountData = [];
          state.bookingUnCheckoutNonAccountData = action.payload;
        }
      }
    );
    builder.addCase(
      fetchGetBookingDetailsUnCheckoutNonAccount.rejected,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.bookingUnCheckoutNonAccountLoading === true &&
          state.bookingUnCheckoutNonAccountRequestId === requestId
        ) {
          state.bookingUnCheckoutNonAccountLoading = false;
          state.bookingUnCheckoutNonAccountSuccess = false;
          state.bookingUnCheckoutNonAccountRequestId = undefined;
          state.bookingUnCheckoutNonAccountError = action.payload;
        }
      }
    );

    builder.addCase(
      fetchGetTimesToBookingNonAccount.pending,
      (state, action) => {
        state.bookingTimesNonAccountLoading = true;
        if (state.bookingTimesNonAccountLoading === true) {
          state.bookingTimesNonAccountRequestId = action.meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchGetTimesToBookingNonAccount.fulfilled,
      (state, action) => {
        if (
          state.bookingTimesNonAccountLoading === true &&
          state.bookingTimesNonAccountRequestId === action.meta.requestId
        ) {
          state.bookingTimesNonAccountLoading = false;
          state.bookingTimesNonAccountRequestId = undefined;
          state.bookingTimesNonAccountSuccess = true;
          state.bookingTimesNonAccountData = [];
          state.bookingTimesNonAccountData = action.payload;
        }
      }
    );
    builder.addCase(
      fetchGetTimesToBookingNonAccount.rejected,
      (state, action) => {
        if (
          state.bookingTimesNonAccountLoading === true &&
          state.bookingTimesNonAccountRequestId === action.meta.requestId
        ) {
          state.bookingTimesNonAccountLoading = false;
          state.bookingTimesNonAccountRequestId = undefined;
          state.bookingTimesNonAccountSuccess = false;
          state.bookingTimesNonAccountError = action.payload;
          state.bookingTimesNonAccountData = [];
        }
      }
    );
  },
});

export const { onClearTimesNonAccount, onFilterAvailableTimesNonAccount } =
  getTimesSliceNonAccount.actions;
export default getTimesSliceNonAccount.reducer;
