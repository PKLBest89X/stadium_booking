import { createSlice } from "@reduxjs/toolkit";
import { fetchGetBookingByAdmin } from "../../../../middlewares/stadiumUser/fetchReport/fetchBookingReport";
import moment from "moment";

const initialState = {
  reportBookingLoading: false,
  reportPaidData: [],
  reportPaidSuccess: null,
  reportUnPaidSuccess: null,
  reportUnPaidData: [],
  reportBookingData: [],
  reportBookingSuccess: null,
  reportBookingError: null,
  reportBookingRequestId: undefined,
  foundUnCheckoutNonAccount: [],
  filterResultNonAccount: [],
  filterResultByStadiumsNonAccount: [],
  allTimesByStadiumsNonAccount: [],
  stadiumsSelectedNonAccount: "",
  filterByDateDataNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  showReportBooking: [],
  otherReportBookingState: null,
  showOtherReportBooking: [],
  reportBookingInfo: {
    bookingId: "",
    bookingDate: "",
    bookingCancel: "",
    customerName: "",
    customerSurname: "",
    customerType: "",
    customerTel: "",
  },
};

const reportBookingSlice = createSlice({
  name: "reportBooking",
  initialState,
  reducers: {
    onShowReportBooking: (state, { payload }) => {
      if (payload.profile === "ໂທຈອງ") {
        state.reportBookingInfo = {
          ...state.reportBookingInfo,
          bookingId: payload.b_id,
          bookingDate: payload.booking_date,
          bookingCancel: payload.booking_timecancel,
          customerName: payload.c_name,
          customerSurname: payload.c_surname,
          customerType: "ໂທຈອງ",
          customerTel: payload.c_phone,
        };
      } else {
        state.reportBookingInfo = {
          ...state.reportBookingInfo,
          bookingId: payload.b_id,
          bookingDate: payload.booking_date,
          bookingCancel: payload.booking_timecancel,
          customerName: payload.c_name,
          customerSurname: payload.c_surname,
          customerType: "ຈອງຜ່ານເວັບ",
          customerTel: payload.c_phone,
        };
      }
      state.showReportBooking = state.reportBookingData.filter(
        (items) =>
          items.b_id === payload.b_id &&
          items.std_id === payload.std_id &&
          items.td_id === payload.td_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let otherDataSameBooking = [];
      otherDataSameBooking = state.reportBookingData.filter(
        (items) => items.b_id === payload.b_id
      );

      state.showOtherReportBooking = otherDataSameBooking.filter(
        (items1) =>
          !state.showReportBooking.some(
            (items2) =>
              items1.b_id === items2.b_id &&
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );

      if (state.showOtherReportBooking.length > 0) {
        state.otherReportBookingState = true;
      } else {
        state.otherReportBookingState = false;
      }
    },

    onLoadAdminBookingPaid: (state, { payload }) => {
      state.reportPaidData = state.reportBookingData.filter(
        (items) => items.sub_status === payload
      );
      if (state.reportPaidData.length > 0) {
        state.reportPaidSuccess = true;
      } else {
        state.reportPaidSuccess = false;
      }
    },
    onLoadAdminBookingUnPaid: (state, { payload }) => {
      state.reportUnPaidData = state.reportBookingData.filter(
        (items) => items.sub_status === payload
      );
      if (state.reportUnPaidData.length > 0) {
        state.reportUnPaidSuccess = true;
      } else {
        state.reportUnPaidSuccess = false;
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
        state.filterResultNonAccount = state.reportBookingData.filter(
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
          state.allTimesByStadiumsNonAccount = state.reportBookingData.filter(
            (items) => items.std_id === state.stadiumsSelectedNonAccount
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    //ກາຈຈອງທັງໝົດ
    builder.addCase(fetchGetBookingByAdmin.pending, (state, action) => {
      state.reportBookingLoading = true;
      if (state.reportBookingLoading === true) {
        state.reportBookingRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetBookingByAdmin.fulfilled, (state, action) => {
      if (
        state.reportBookingLoading === true &&
        state.reportBookingRequestId === action.meta.requestId
      ) {
        state.reportBookingLoading = false;
        state.reportBookingRequestId = undefined;
        state.reportBookingSuccess = true;
        state.reportBookingData = [];
        state.reportBookingData = action.payload;
      }
    });
    builder.addCase(fetchGetBookingByAdmin.rejected, (state, action) => {
      if (
        state.reportBookingLoading === true &&
        state.reportBookingRequestId === action.meta.requestId
      ) {
        state.reportBookingLoading = false;
        state.reportBookingRequestId = undefined;
        state.reportBookingSuccess = false;
        state.reportBookingError = action.payload;
        state.reportBookingData = [];
      }
    });
  },
});

export const {
  onShowReportBooking,
  onLoadAdminBookingPaid,
  onLoadAdminBookingUnPaid,
} = reportBookingSlice.actions;
export default reportBookingSlice.reducer;
