import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetPaymentByAdmin,
  fetchGetStadiumsPaymentByAdmin,
  fetchGetWaterPaymentByAdmin,
} from "../../../../middlewares/stadiumUser/fetchReport/fetchPaymentReport";
import moment from "moment";

const initialState = {
  reportPaymentLoading: false,
  reportPaymentError: null,
  reportPaymentRequestId: null,
  reportPaymentData: [],
  reportPaymentSuccess: null,
  reportStadiumsLoading: false,
  reportStadiumsSuccess: null,
  reportStadiumsData: [],
  reportStadiumsError: null,
  reportStadiumsRequestId: undefined,
  reportWaterLoading: false,
  reportWaterSuccess: null,
  reportWaterData: [],
  reportWaterError: null,
  reportWaterRequestId: undefined,
  stadiumsWithWater: null,
  stadiumsWithWaterData: [],
  stadiumsOnly: null,
  stadiumsOnlyData: [],
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

const reportPaymentSlice = createSlice({
  name: "reportPayment",
  initialState,
  reducers: {
    onShowReportPayment: (state, { payload }) => {
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
      state.showReportBooking = state.reportPaymentData.filter(
        (items) =>
          items.b_id === payload.b_id &&
          items.std_id === payload.std_id &&
          items.td_id === payload.td_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let otherDataSameBooking = [];
      otherDataSameBooking = state.reportPaymentData.filter(
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

    onLoadAdminStadiumsWithWaterPayment: (state, { payload }) => {
      state.stadiumsWithWaterData = state.reportStadiumsData.filter((items1) =>
        state.reportWaterData.some((items2) => items1.bp_id === items2.bp_id)
      );
      if (state.stadiumsWithWaterData.length > 0) {
        state.stadiumsWithWaterState = true;
      } else {
        state.stadiumsWithWaterState = false;
      }
    },
    onLoadAdminOnlyStadiumsPayment: (state, { payload }) => {
      state.stadiumsOnlyData = state.reportStadiumsData.filter(
        (items1) =>
          !state.reportWaterData.some((items2) => items1.bp_id === items2.bp_id)
      );
      if (state.stadiumsOnlyData.length > 0) {
        state.stadiumsOnly = true;
      } else {
        state.stadiumsOnly = false;
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
        state.filterResultNonAccount = state.reportPaymentData.filter(
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
          state.allTimesByStadiumsNonAccount = state.reportPaymentData.filter(
            (items) => items.std_id === state.stadiumsSelectedNonAccount
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    //ລາຍການຊຳລະຫຼັກ
    builder.addCase(fetchGetPaymentByAdmin.pending, (state, action) => {
      state.reportPaymentLoading = true;
      if (state.reportPaymentLoading === true) {
        state.reportPaymentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetPaymentByAdmin.fulfilled, (state, action) => {
      if (
        state.reportPaymentLoading === true &&
        state.reportPaymentRequestId === action.meta.requestId
      ) {
        state.reportPaymentLoading = false;
        state.reportPaymentRequestId = undefined;
        state.reportPaymentSuccess = true;
        state.reportPaymentData = [];
        state.reportPaymentData = action.payload;
      }
    });
    builder.addCase(fetchGetPaymentByAdmin.rejected, (state, action) => {
      if (
        state.reportPaymentLoading === true &&
        state.reportPaymentRequestId === action.meta.requestId
      ) {
        state.reportPaymentLoading = false;
        state.reportPaymentRequestId = undefined;
        state.reportPaymentSuccess = false;
        state.reportPaymentError = action.payload;
        state.reportPaymentData = [];
      }
    });

    //ລາຍການຊຳລະສະເພາະຄ່າເດີ່ນ
    builder.addCase(fetchGetStadiumsPaymentByAdmin.pending, (state, action) => {
      state.reportStadiumsLoading = true;
      if (state.reportStadiumsLoading === true) {
        state.reportStadiumsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(
      fetchGetStadiumsPaymentByAdmin.fulfilled,
      (state, action) => {
        if (
          state.reportStadiumsLoading === true &&
          state.reportStadiumsRequestId === action.meta.requestId
        ) {
          state.reportStadiumsLoading = false;
          state.reportStadiumsRequestId = undefined;
          state.reportStadiumsSuccess = true;
          state.reportStadiumsData = [];
          state.reportStadiumsData = action.payload;
        }
      }
    );
    builder.addCase(
      fetchGetStadiumsPaymentByAdmin.rejected,
      (state, action) => {
        if (
          state.reportStadiumsLoading === true &&
          state.reportStadiumsRequestId === action.meta.requestId
        ) {
          state.reportStadiumsLoading = false;
          state.reportStadiumsRequestId = undefined;
          state.reportStadiumsSuccess = false;
          state.reportStadiumsError = action.payload;
          state.reportStadiumsData = [];
        }
      }
    );

    //ລາຍການຊຳລະສະເພາະຄ່ານ້ຳ
    builder.addCase(fetchGetWaterPaymentByAdmin.pending, (state, action) => {
      state.reportWaterLoading = true;
      if (state.reportWaterLoading === true) {
        state.reportWaterRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetWaterPaymentByAdmin.fulfilled, (state, action) => {
      if (
        state.reportWaterLoading === true &&
        state.reportWaterRequestId === action.meta.requestId
      ) {
        state.reportWaterLoading = false;
        state.reportWaterRequestId = undefined;
        state.reportWaterSuccess = true;
        state.reportWaterData = [];
        state.reportWaterData = action.payload;
      }
    });
    builder.addCase(fetchGetWaterPaymentByAdmin.rejected, (state, action) => {
      if (
        state.reportWaterLoading === true &&
        state.reportWaterRequestId === action.meta.requestId
      ) {
        state.reportWaterLoading = false;
        state.reportWaterRequestId = undefined;
        state.reportWaterSuccess = false;
        state.reportWaterError = action.payload;
        state.reportWaterData = [];
      }
    });
  },
});

export const {
  onShowReportPayment,
  onLoadAdminStadiumsWithWaterPayment,
  onLoadAdminOnlyStadiumsPayment,
} = reportPaymentSlice.actions;
export default reportPaymentSlice.reducer;
