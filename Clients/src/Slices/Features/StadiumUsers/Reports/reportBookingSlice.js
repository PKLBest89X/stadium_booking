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
  adminActiveLoading: false,
  adminActiveSuccess: null,
  adminActiveError: null,
  adminActiveData: [],
  adminPendingLoading: false,
  adminPendingSuccess: null,
  adminPendingError: null,
  adminPendingData: [],
  adminVoidLoading: false,
  adminVoidSuccess: null,
  adminVoidError: null,
  userVoidData: [],
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
          depositTimeLimit: payload.booking_timecancel,
          approveState: payload.approve_state,
          depositPercent: payload.percent_of_deposit,
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
          depositTimeLimit: payload.booking_timecancel,
          approveState: payload.approve_state,
          depositPercent: payload.percent_of_deposit,
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
        } else {
          state.reportBookingOnPhone = 0;
        }
        let onWeb = [];
        onWeb = state.reportPaidData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        } else {
          state.reportBookingOnWeb = 0;
        }
      } else {
        state.reportPaidSuccess = false;
        state.reportBookingAllValue = 0;
        state.reportBookingOnPhone = 0;
        state.reportBookingOnWeb = 0;
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
        } else {
          state.reportBookingOnPhone = 0;
        }
        let onWeb = [];
        onWeb = state.reportUnPaidData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        } else {
          state.reportBookingOnWeb = 0;
        }
      } else {
        state.reportUnPaidSuccess = false;
        state.reportBookingAllValue = 0;
        state.reportBookingOnPhone = 0;
        state.reportBookingOnWeb = 0;
      }
    },
    onLoadAdminActive: (state, { payload }) => {
      state.adminActiveData = state.reportBookingData.filter(
        (items) =>
          items.sub_status === payload || items.approve_state === "active"
      );
      if (state.adminActiveData.length > 0) {
        state.adminActiveSuccess = true;
        if (state.adminActiveData.length > 0) {
          state.reportBookingAllValue = state.adminActiveData.length;
        }
        let onPhone = [];
        onPhone = state.adminActiveData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        } else {
          state.reportBookingOnPhone = 0;
        }
        let onWeb = [];
        onWeb = state.adminActiveData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        } else {
          state.reportBookingOnWeb = 0;
        }
      } else {
        state.adminActiveSuccess = false;
        state.reportBookingAllValue = 0;
        state.reportBookingOnPhone = 0;
        state.reportBookingOnWeb = 0;
      }
    },
    onLoadAdminPending: (state, { payload }) => {
      state.adminPendingData = state.reportBookingData.filter(
        (items) => items.approve_state === payload
      );
      if (state.adminPendingData.length > 0) {
        state.adminPendingSuccess = true;
        if (state.adminPendingData.length > 0) {
          state.reportBookingAllValue = state.adminPendingData.length;
        }
        let onPhone = [];
        onPhone = state.adminPendingData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        } else {
          state.reportBookingOnPhone = 0;
        }
        let onWeb = [];
        onWeb = state.adminPendingData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        } else {
          state.reportBookingOnWeb = 0;
        }
      } else {
        state.adminPendingSuccess = false;
        state.reportBookingAllValue = 0;
        state.reportBookingOnPhone = 0;
        state.reportBookingOnWeb = 0;
      }
    },
    onLoadAdminVoid: (state, { payload }) => {
      state.adminVoidData = state.reportBookingData.filter(
        (items) => items.approve_state === payload
      );
      if (state.adminVoidData.length > 0) {
        state.adminVoidSuccess = true;
        if (state.adminVoidData.length > 0) {
          state.reportBookingAllValue = state.adminVoidData.length;
        }
        let onPhone = [];
        onPhone = state.adminVoidData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        } else {
          state.reportBookingOnPhone = 0;
        }
        let onWeb = [];
        onWeb = state.adminVoidData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        } else {
          state.reportBookingOnWeb = 0;
        }
      } else {
        state.adminVoidSuccess = false;
        state.reportBookingAllValue = 0;
        state.reportBookingOnPhone = 0;
        state.reportBookingOnWeb = 0;
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
      //////////ສຳລັບການຈອງທີ່ອະນຸມັດແລ້ວ

      if (state.adminActiveData.length > 0) {
        state.resultSearchAndSeletedDate = state.adminActiveData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.adminActiveSuccess = true;
        } else {
          state.adminActiveSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ລໍຖ້າອະນຸມັດ

      if (state.adminPendingData.length > 0) {
        state.resultSearchAndSeletedDate = state.adminPendingData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.adminPendingSuccess = true;
        } else {
          state.adminPendingSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ເປັນໂມຄະ

      if (state.adminVoidData.length > 0) {
        state.resultSearchAndSeletedDate = state.adminVoidData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.adminVoidSuccess = true;
        } else {
          state.adminVoidSuccess = false;
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
        state.reportBookingData = action.payload.map((items) => ({
          ...items,
          approve_state:
            (new Date(items.booking_timecancel).getTime() -
              new Date().getTime() <
              0 &&
              items.approve_state === "pending") ||
            items.sub_status === "void"
              ? "void"
              : items.approve_state,
        }));
        if (state.reportBookingData.length > 0) {
          state.reportBookingAllValue = state.reportBookingData.length;
        } else {
          state.reportBookingAllValue = 0;
          state.reportBookingOnPhone = 0;
          state.reportBookingOnWeb = 0;
        }
        let onPhone = [];
        onPhone = state.reportBookingData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (onPhone.length > 0) {
          state.reportBookingOnPhone = onPhone.length;
        } else {
          state.reportBookingOnPhone = 0;
        }
        let onWeb = [];
        onWeb = state.reportBookingData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (onWeb.length > 0) {
          state.reportBookingOnWeb = onWeb.length;
        } else {
          state.reportBookingOnWeb = 0;
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
  onLoadAdminActive,
  onLoadAdminPending,
  onLoadAdminVoid,
  onFilterBookingHistoryByDate,
  onSearchAllBookingHistory,
  onClearResultSearchAndSeletedDate,
} = reportBookingSlice.actions;
export default reportBookingSlice.reducer;
