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
  filterByDateDataNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  showByDateData: moment(Date.now()).format("YYYY-MM-DD"),
  searchTyping: "",
  resultSearchAndSeletedDate: [],
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
    customerProfile: "",
  },
  reportBookingAllValue: 0,
  reportBookingOnWeb: 0,
  reportBookingOnPhone: 0,
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
          customerProfile: payload.profile,
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
          customerProfile: payload.profile,
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
        if (state.reportPaidData.length > 0) {
          state.reportBookingAllValue = state.reportPaidData.length;
        }
        let onPhone = [];
        onPhone = state.reportPaidData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        }
        let onWeb = [];
        onWeb = state.reportPaidData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        }
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
        if (state.reportUnPaidData.length > 0) {
          state.reportBookingAllValue = state.reportUnPaidData.length;
        }
        let onPhone = [];
        onPhone = state.reportUnPaidData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        }
        let onWeb = [];
        onWeb = state.reportUnPaidData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        }
      } else {
        state.reportUnPaidSuccess = false;
      }
    },

    onFilterBookingHistoryByDate: (state, { payload }) => {
      state.showByDateData = payload;
      if (state.reportBookingData.length > 0) {
        state.resultSearchAndSeletedDate = state.reportBookingData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.reportBookingSuccess = true;
        } else {
          state.reportBookingSuccess = false;
        }
      }
      /////ສຳລັບການຈອງທີ່ຊຳລະແລ້ວ
      if (state.reportPaidData.length > 0) {
        state.resultSearchAndSeletedDate = state.reportPaidData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.reportPaidSuccess = true;
        } else {
          state.reportPaidSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ບໍ່ໄດ້ຊຳລະ

      if (state.reportUnPaidData.length > 0) {
        state.resultSearchAndSeletedDate = state.reportUnPaidData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.reportUnPaidSuccess = true;
        } else {
          state.reportUnPaidSuccess = false;
        }
      }
    },
    onSearchAllBookingHistory: (state, { payload }) => {
      state.searchTyping = payload;
      if (state.reportBookingData.length > 0) {
        let arraySearch = [];
        arraySearch = state.reportBookingData.filter(
          (items) =>
            items.c_name.toUpperCase().includes(payload.toUpperCase()) ||
            items.std_name.toUpperCase().includes(payload.toUpperCase())
        );
        if (arraySearch.length > 0) {
          state.reportBookingSuccess = true;
          state.resultSearchAndSeletedDate = arraySearch;
        } else {
          state.reportBookingSuccess = false;
          state.resultSearchAndSeletedDate = [];
        }
      }

      ////////////////////// /////ສຳລັບການຈອງທີ່ຊຳລະແລ້ວ

      if (state.reportPaidData.length > 0) {
        let arraySearch = [];
        arraySearch = state.reportPaidData.filter(
          (items) =>
            items.c_name.toUpperCase().includes(payload.toUpperCase()) ||
            items.std_name.toUpperCase().includes(payload.toUpperCase())
        );
        if (arraySearch.length > 0) {
          state.reportPaidSuccess = true;
          state.resultSearchAndSeletedDate = arraySearch;
        } else {
          state.reportPaidSuccess = false;
          state.resultSearchAndSeletedDate = [];
        }
      }

      ////////////////////// /////ສຳລັບການຈອງທີ່ຊຳລະແລ້ວ

      if (state.reportUnPaidData.length > 0) {
        let arraySearch = [];
        arraySearch = state.reportUnPaidData.filter(
          (items) =>
            items.c_name.toUpperCase().includes(payload.toUpperCase()) ||
            items.std_name.toUpperCase().includes(payload.toUpperCase())
        );
        if (arraySearch.length > 0) {
          state.reportUnPaidSuccess = true;
          state.resultSearchAndSeletedDate = arraySearch;
        } else {
          state.reportUnPaidSuccess = false;
          state.resultSearchAndSeletedDate = [];
        }
      }
    },
    onClearResultSearchAndSeletedDate: (state, { payload }) => {
      state.resultSearchAndSeletedDate = [];
      if (state.reportBookingData.length > 0) {
        state.reportBookingSuccess = true;
      } else {
        state.reportBookingSuccess = false;
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
        if (state.reportBookingData.length > 0) {
          state.reportBookingAllValue = state.reportBookingData.length;
        }
        let onPhone = [];
        onPhone = state.reportBookingData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        }
        let onWeb = [];
        onWeb = state.reportBookingData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        }
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
  onFilterBookingHistoryByDate,
  onSearchAllBookingHistory,
  onClearResultSearchAndSeletedDate,
} = reportBookingSlice.actions;
export default reportBookingSlice.reducer;
