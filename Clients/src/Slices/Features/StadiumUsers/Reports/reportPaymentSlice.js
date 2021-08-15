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
  showReportPayment: [],
  otherReportPaymentState: null,
  showOtherReportPayment: [],
  otherWithWaterState: null,
  showReportWater: [],
  reportPaymentInfo: {
    bookingId: "",
    bookingDate: "",
    bookingCancel: "",
    customerName: "",
    customerSurname: "",
    customerType: "",
    customerTel: "",
  },
  reportSummaryPayment: {
    paymentId: "",
    paymentDate: "",
    employee: "",
    totalWater: "",
    totalStadium: "",
    total: "",
  },
  reportPaymentAllValue: 0,
  reportPaymentAllTotal: 0,
};

const reportPaymentSlice = createSlice({
  name: "reportPayment",
  initialState,
  reducers: {
    onShowReportPayment: (state, { payload }) => {
      if (payload.profile === "ໂທຈອງ") {
        state.reportPaymentInfo = {
          ...state.reportPaymentInfo,
          bookingId: payload.b_id,
          customerName: payload.c_name,
          customerSurname: payload.c_surname,
          customerType: "ໂທຈອງ",
          customerTel: payload.c_phone,
          customerProfile: payload.profile,
        };
      } else {
        state.reportPaymentInfo = {
          ...state.reportPaymentInfo,
          bookingId: payload.b_id,
          customerName: payload.c_name,
          customerSurname: payload.c_surname,
          customerType: "ຈອງຜ່ານເວັບ",
          customerTel: payload.c_phone,
          customerProfile: payload.profile,
        };
      }

      //////////////////ສ່ວນຂອງການສະຫຼຸບລວມລາຄາການຊຳລະ
      let foundReportPayment = state.reportPaymentData.find(
        (items) => items.bp_id === payload.bp_id
      );
      state.reportSummaryPayment = {
        ...state.reportSummaryPayment,
        paymentId: foundReportPayment.bp_id,
        paymentDate: foundReportPayment.payment_date,
        employee: foundReportPayment.su_name,
        totalWater: foundReportPayment.total_drinkingprice,
        totalStadium: foundReportPayment.total_stadiumprice,
        total: foundReportPayment.total,
      };

      state.showReportPayment = state.reportStadiumsData.filter(
        (items) =>
          items.bp_id === payload.bp_id &&
          items.b_id === payload.b_id &&
          items.std_id === payload.std_id &&
          items.td_id === payload.td_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let otherDataSameBooking = [];
      otherDataSameBooking = state.reportStadiumsData.filter(
        (items) => items.bp_id === payload.bp_id && items.b_id === payload.b_id
      );

      state.showOtherReportPayment = otherDataSameBooking.filter(
        (items1) =>
          !state.showReportPayment.some(
            (items2) =>
              items1.bp_id === items2.bp_id &&
              items1.b_id === items2.b_id &&
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );

      if (state.showOtherReportPayment.length > 0) {
        state.otherReportPaymentState = true;
      } else {
        state.otherReportPaymentState = false;
      }

      ////////////////////////ສຳລັບບິນທີ່ມີຄ່ານ້ຳນຳກັນ
      state.showReportWater = state.reportWaterData.filter(
        (items) => items.bp_id === payload.bp_id
      );

      if (state.showReportWater.length > 0) {
        state.otherWithWaterState = true;
      } else {
        state.otherWithWaterState = false;
      }
    },

    onLoadAdminStadiumsWithWaterPayment: (state, { payload }) => {
      state.stadiumsWithWaterData = state.reportStadiumsData.filter((items1) =>
        state.reportWaterData.some((items2) => items1.bp_id === items2.bp_id)
      );
      if (state.stadiumsWithWaterData.length > 0) {
        state.stadiumsWithWaterState = true;
        let filterWithStadiumOnly = [];
        filterWithStadiumOnly = state.reportPaymentData.filter((items1) =>
          state.stadiumsWithWaterData.some((items2) => items1.bp_id === items2.bp_id)
        );
        if (filterWithStadiumOnly.length > 0) {
          state.reportPaymentAllValue = filterWithStadiumOnly.length;
          state.reportPaymentAllTotal = filterWithStadiumOnly.reduce(
            (sum, item) => sum + item.total,
            0
          );
        }
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
        let filterWithStadiumOnly = [];
        filterWithStadiumOnly = state.reportPaymentData.filter((items1) =>
          state.stadiumsOnlyData.some((items2) => items1.bp_id === items2.bp_id)
        );
        if (filterWithStadiumOnly.length > 0) {
          state.reportPaymentAllValue = filterWithStadiumOnly.length;
          state.reportPaymentAllTotal = filterWithStadiumOnly.reduce(
            (sum, item) => sum + item.total,
            0
          );
        }
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
        if (state.reportPaymentData.length > 0) {
          state.reportPaymentAllValue = state.reportPaymentData.length;
          state.reportPaymentAllTotal = state.reportPaymentData.reduce(
            (sum, items) => sum + items.total,
            0
          );
        }
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
