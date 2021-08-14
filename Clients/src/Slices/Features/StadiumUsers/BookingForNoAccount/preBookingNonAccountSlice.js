import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookingListDetailsNonAccount,
  fetchBookingListNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import {
  fetchAvailableCancelBookingNonAccount,
  fetchCancelBookingNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchCancelBookingNonAccount";

const initialState = {
  preBookingNonAccountLoading: false,
  preBookingNonAccountDetailsLoading: false,
  cancelNonAccountLoading: false,
  cancelNonAccountSuccess: null,
  preBookingNonAccountSuccess: null,
  preBookingNonAccountDetailsSuccess: null,
  preBookingNonAccountData: [],
  preBookingNonAccountDetailsData: [],
  preBookingNonAccountError: null,
  preBookingNonAccountDetailsError: null,
  cancelNonAccountError: null,
  preBookingNonAccountRequestId: undefined,
  preBookingNonAccountDetailsRequestId: undefined,
  cancelNonAccountRequestId: undefined,
  showBookingDetails: [],
  otherDetailsState: null,
  showOtherBookingDetails: [],
  information: {
    bookingId: "",
    bookingDate: "",
    bookingCancel: "",
    customerName: "",
    customerSurname: "",
    customerType: "",
    customerTel: "",
    customerProfile: "",
  },
};

const preBookingNonAccountSlice = createSlice({
  name: "preBookingNonAccount",
  initialState,
  reducers: {
    onShowBookingDetails: (state, { payload }) => {
      if (payload.profile === "ໂທຈອງ") {
        state.information = {
          ...state.information,
          bookingId: payload.b_id,
          bookingDate: payload.booking_date,
          bookingCancel: payload.booking_timecancel,
          customerName: payload.c_name,
          customerSurname: payload.c_surname,
          customerType: "ໂທຈອງ",
          customerTel: payload.c_phone,
          customerProfile: payload.profile
        };
      } else {
        state.information = {
          ...state.information,
          bookingId: payload.b_id,
          bookingDate: payload.booking_date,
          bookingCancel: payload.booking_timecancel,
          customerName: payload.c_name,
          customerSurname: payload.c_surname,
          customerType: "ຈອງຜ່ານເວັບ",
          customerTel: payload.c_phone,
          customerProfile: payload.profile
        };
      }
      state.showBookingDetails = state.preBookingNonAccountDetailsData.filter(
        (items) =>
          items.b_id === payload.b_id &&
          items.std_id === payload.std_id &&
          items.td_id === payload.td_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let otherDataSameBooking = [];
      otherDataSameBooking = state.preBookingNonAccountDetailsData.filter(
        (items) => items.b_id === payload.b_id
      );

      state.showOtherBookingDetails = otherDataSameBooking.filter(
        (items1) =>
          !state.showBookingDetails.some(
            (items2) =>
              items1.b_id === items2.b_id &&
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );

      if (state.showOtherBookingDetails.length > 0) {
        state.otherDetailsState = true;
      } else {
        state.otherDetailsState = false;
      }
    },
    onCancelBookingNonAccount: (state, { payload }) => {
      let afterDeleted = [];
      afterDeleted = state.preBookingNonAccountDetailsData.filter(
        (items) => items.b_id !== payload
      );
      if (afterDeleted.length > 0) {
        state.preBookingNonAccountDetailsData = afterDeleted;
        state.preBookingNonAccountDetailsSuccess = true;
        state.cancelNonAccountSuccess = true;
      } else {
        state.preBookingNonAccountDetailsData = [];
        state.preBookingNonAccountDetailsSuccess = false;
        state.cancelNonAccountSuccess = false;
      }
    },
  },
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

    builder.addCase(
      fetchBookingListDetailsNonAccount.pending,
      (state, action) => {
        state.preBookingNonAccountDetailsLoading = true;
        if (state.preBookingNonAccountDetailsLoading === true) {
          state.preBookingNonAccountDetailsRequestId = action.meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchBookingListDetailsNonAccount.fulfilled,
      (state, action) => {
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
      }
    );
    builder.addCase(
      fetchBookingListDetailsNonAccount.rejected,
      (state, action) => {
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
      }
    );

    //ການຈອງທີ່ຍົກເລີກໄດ້
    builder.addCase(
      fetchAvailableCancelBookingNonAccount.pending,
      (state, action) => {
        state.cancelNonAccountLoading = true;
        if (state.cancelNonAccountLoading === true) {
          state.cancelNonAccountRequestId = action.meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchAvailableCancelBookingNonAccount.fulfilled,
      (state, action) => {
        if (
          state.cancelNonAccountLoading === true &&
          state.cancelNonAccountRequestId === action.meta.requestId
        ) {
          state.cancelNonAccountLoading = false;
          state.cancelNonAccountRequestId = undefined;
          state.cancelNonAccountSuccess = true;
          state.preBookingNonAccountDetailsData = [];
          state.preBookingNonAccountDetailsData = action.payload;
        }
      }
    );
    builder.addCase(
      fetchAvailableCancelBookingNonAccount.rejected,
      (state, action) => {
        if (
          state.cancelNonAccountLoading === true &&
          state.cancelNonAccountRequestId === action.meta.requestId
        ) {
          state.cancelNonAccountLoading = false;
          state.cancelNonAccountRequestId = undefined;
          state.cancelNonAccountSuccess = false;
          state.cancelNonAccountError = action.payload;
          state.preBookingNonAccountDetailsData = [];
        }
      }
    );

    //ຍົກເລີກການຈອງ
    builder.addCase(fetchCancelBookingNonAccount.pending, (state, action) => {
      state.preBookingNonAccountDetailsLoading = true;
    });
    builder.addCase(fetchCancelBookingNonAccount.fulfilled, (state, action) => {
      state.preBookingNonAccountDetailsLoading = false;
      state.preBookingNonAccountDetailsSuccess = true;
      state.cancelNonAccountSuccess = true;
    });
    builder.addCase(fetchCancelBookingNonAccount.rejected, (state, action) => {
      state.preBookingNonAccountDetailsLoading = false;
      state.preBookingNonAccountDetailsError = action.payload;
    });
  },
});

export const { onShowBookingDetails, onCancelBookingNonAccount } =
  preBookingNonAccountSlice.actions;
export default preBookingNonAccountSlice.reducer;
