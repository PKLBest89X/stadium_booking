import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetHistoryByUser,
  fetchGetHistoryDetailsByUser,
  fetchGetPaidHistoryByUser,
  fetchGetUnPaidHistoryByUser,
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
  cancelData: [],
  cancelError: null,
  cancelRequestId: undefined,
  userPaidSuccess: null,
  userUnPaidSuccess: null,
  userPaidData: [],
  userUnPaidData: [],
  bookingHistoryData: [],
  bookingHistoryDetailsData: [],
  bookingHistorySuccess: null,
  bookingHistoryError: null,
  bookingHistoryRequestId: undefined,
  bookingHistoryDetailsSuccess: null,
  bookingHistoryDetailsError: null,
  bookingHistoryDetailsRequestId: undefined,
  userActiveLoading: false,
  userActiveSuccess: null,
  userActiveError: null,
  userActiveData: [],
  userPendingLoading: false,
  userPendingSuccess: null,
  userPendingError: null,
  userPendingData: [],
  userVoidLoading: false,
  userVoidSuccess: null,
  userVoidError: null,
  userVoidData: [],
  showByDateData: moment(Date.now()).format("YYYY-MM-DD"),
  searchTyping: "",
  resultSearchAndSeletedDate: [],
  showBooking: [],
  otherBookingState: null,
  showOtherBooking: [],
  bookingInfo: {
    bookingId: "",
    bookingDate: "",
    bookingCancel: "",
    depositTimeLimit: "",
    approveState: "",
    depositPercent: 0,
    total: 0,
    totalDeposit: 0,
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
        depositTimeLimit: payload.booking_timecancel,
        approveState: payload.approve_state,
        depositPercent: payload.percent_of_deposit,
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
      state.bookingInfo.total = otherDataSameBooking.reduce(
        (sum, items) =>
          items.sub_status === "pending" || items.sub_status === "ຍັງບໍ່ເຕະ" || items.sub_status === "ເຕະແລ້ວ"
            ? sum + items.sp_price
            : sum,
        0
      );
      state.bookingInfo.totalDeposit =
        (state.bookingInfo.total * parseInt(payload.percent_of_deposit)) / 100;
    },
    onCancelBooking: (state, { payload }) => {
      let afterDeleted = [];
      afterDeleted = state.cancelData.filter((items) => items.b_id !== payload);
      if (afterDeleted.length > 0) {
        state.cancelData = afterDeleted;
        state.bookingHistoryDetailsSuccess = true;
        state.cancelSuccess = true;
      } else {
        state.cancelData = [];
        state.bookingHistoryDetailsSuccess = false;
        state.cancelSuccess = false;
      }
    },
    onLoadUserBookingPaid: (state, { payload }) => {
      state.userPaidData = state.bookingHistoryDetailsData.filter(
        (items) => items.sub_status === payload
      );
      if (state.userPaidData.length > 0) {
        state.userPaidSuccess = true;
      } else {
        state.userPaidSuccess = false;
      }
    },
    onLoadUserBookingUnPaid: (state, { payload }) => {
      state.userUnPaidData = state.bookingHistoryDetailsData.filter(
        (items) =>
          items.sub_status === payload ||
          items.sub_status === "void" ||
          items.sub_status === "pending"
      );
      if (state.userUnPaidData.length > 0) {
        state.userUnPaidSuccess = true;
      } else {
        state.userUnPaidSuccess = false;
      }
    },
    onLoadUserActiveBooking: (state, { payload }) => {
      state.userActiveData = state.bookingHistoryDetailsData.filter(
        (items) =>
          items.sub_status === payload || items.approve_state === "active"
      );
      if (state.userActiveData.length > 0) {
        state.userActiveSuccess = true;
      } else {
        state.userActiveSuccess = false;
      }
    },
    onLoadUserPendingBooking: (state, { payload }) => {
      state.userPendingData = state.bookingHistoryDetailsData.filter(
        (items) => items.approve_state === payload
      );
      if (state.userPendingData.length > 0) {
        state.userPendingSuccess = true;
      } else {
        state.userPendingSuccess = false;
      }
    },
    onLoadUserVoidBooking: (state, { payload }) => {
      state.userVoidData = state.bookingHistoryDetailsData.filter(
        (items) => items.approve_state === payload
      );
      if (state.userVoidData.length > 0) {
        state.userVoidSuccess = true;
      } else {
        state.userVoidSuccess = false;
      }
    },
    onFilterBookingHistoryByDate: (state, { payload }) => {
      state.showByDateData = payload;
      if (state.bookingHistoryDetailsData.length > 0) {
        state.resultSearchAndSeletedDate =
          state.bookingHistoryDetailsData.filter(
            (items) =>
              moment(items.booking_date).format("YYYY-MM-DD") ===
              state.showByDateData
          );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.bookingHistoryDetailsSuccess = true;
        } else {
          state.bookingHistoryDetailsSuccess = false;
        }
      }
      /////ສຳລັບການຈອງທີ່ຊຳລະແລ້ວ
      if (state.userPaidData.length > 0) {
        state.resultSearchAndSeletedDate = state.userPaidData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.userPaidSuccess = true;
        } else {
          state.userPaidSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ບໍ່ໄດ້ຊຳລະ

      if (state.userUnPaidData.length > 0) {
        state.resultSearchAndSeletedDate = state.userUnPaidData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.userUnPaidSuccess = true;
        } else {
          state.userUnPaidSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ອະນຸມັດແລ້ວ

      if (state.userActiveData.length > 0) {
        state.resultSearchAndSeletedDate = state.userActiveData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.userActiveSuccess = true;
        } else {
          state.userActiveSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ລໍຖ້າອະນຸມັດ

      if (state.userPendingData.length > 0) {
        state.resultSearchAndSeletedDate = state.userPendingData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.userPendingSuccess = true;
        } else {
          state.userPendingSuccess = false;
        }
      }

      //////////ສຳລັບການຈອງທີ່ເປັນໂມຄະ

      if (state.userVoidData.length > 0) {
        state.resultSearchAndSeletedDate = state.userVoidData.filter(
          (items) =>
            moment(items.booking_date).format("YYYY-MM-DD") ===
            state.showByDateData
        );
        if (state.resultSearchAndSeletedDate.length > 0) {
          state.userVoidSuccess = true;
        } else {
          state.userVoidSuccess = false;
        }
      }
    },
    onSearchAllBookingHistory: (state, { payload }) => {
      state.searchTyping = payload;
      if (state.bookingHistoryDetailsData.length > 0) {
        let arraySearch = [];
        arraySearch = state.bookingHistoryDetailsData.filter((items) =>
          items.st_name.toUpperCase().includes(payload.toUpperCase())
        );
        if (arraySearch.length > 0) {
          state.bookingHistoryDetailsSuccess = true;
          state.resultSearchAndSeletedDate = arraySearch;
        } else {
          state.bookingHistoryDetailsSuccess = false;
          state.resultSearchAndSeletedDate = [];
        }
      }

      ////////////////////// /////ສຳລັບການຈອງທີ່ຊຳລະແລ້ວ

      if (state.userPaidData.length > 0) {
        let arraySearch = [];
        arraySearch = state.userPaidData.filter((items) =>
          items.st_name.toUpperCase().includes(payload.toUpperCase())
        );
        if (arraySearch.length > 0) {
          state.userPaidSuccess = true;
          state.resultSearchAndSeletedDate = arraySearch;
        } else {
          state.userPaidSuccess = false;
          state.resultSearchAndSeletedDate = [];
        }
      }

      ////////////////////// /////ສຳລັບການຈອງທີ່ຊຳລະແລ້ວ

      if (state.userUnPaidData.length > 0) {
        let arraySearch = [];
        arraySearch = state.userUnPaidData.filter((items) =>
          items.st_name.toUpperCase().includes(payload.toUpperCase())
        );
        if (arraySearch.length > 0) {
          state.userUnPaidSuccess = true;
          state.resultSearchAndSeletedDate = arraySearch;
        } else {
          state.userUnPaidSuccess = false;
          state.resultSearchAndSeletedDate = [];
        }
      }
    },
    onClearResultSearchAndSeletedDate: (state, { payload }) => {
      state.resultSearchAndSeletedDate = [];
      if (state.bookingHistoryDetailsData.length > 0) {
        state.bookingHistoryDetailsSuccess = true;
      } else {
        state.bookingHistoryDetailsSuccess = false;
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
        state.bookingHistoryDetailsData = action.payload.map((items) => ({
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
        state.cancelData = [];
        state.cancelData = action.payload.map((items) => ({
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
        state.cancelData = [];
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
  },
});

export const {
  onShowBookingHistory,
  onCancelBooking,
  onLoadUserBookingPaid,
  onLoadUserBookingUnPaid,
  onLoadUserActiveBooking,
  onLoadUserPendingBooking,
  onLoadUserVoidBooking,
  onFilterBookingHistoryByDate,
  onSearchAllBookingHistory,
  onClearResultSearchAndSeletedDate,
} = bookingHistorySlice.actions;
export default bookingHistorySlice.reducer;
