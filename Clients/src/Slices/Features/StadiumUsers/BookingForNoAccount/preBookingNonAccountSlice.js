import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookingListDetailsNonAccount,
  fetchBookingListNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import {
  fetchAvailableCancelBookingNonAccount,
  fetchCancelBookingNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchCancelBookingNonAccount";
import {
  fetchApproveBookingSubStatus,
  fetchConfirmApprovingBooking,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchApproveBooking";

const initialState = {
  preBookingNonAccountLoading: false,
  preBookingNonAccountDetailsLoading: false,
  cancelNonAccountLoading: false,
  cancelNonAccountSuccess: null,
  cancelNonAccountData: [],
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
  activeApproveLoading: false,
  activeApproveSuccess: null,
  activeApproveData: [],
  activeApproveError: null,
  activeApproveRequestId: undefined,
  unActiveApproveLoading: false,
  unActiveApproveSuccess: null,
  unActiveApproveData: [],
  unActiveApproveError: null,
  unActiveApproveRequestId: undefined,
  voidBookingNonAccountLoading: false,
  voidBookingNonAccountSuccess: null,
  voidBookingNonAcountData: [],
  voidBookingNonAccountError: null,
  voidBookingNonAccountRequestId: undefined,
  showBookingDetails: [],
  findPendingBooking: "",
  findPendingOtherBooking: "",
  otherDetailsState: null,
  showOtherBookingDetails: [],
  information: {
    bookingId: "",
    bookingDate: "",
    bookingCancel: "",
    depositTimeLimit: "",
    approveState: "",
    depositPercent: 0,
    total: 0,
    totalDeposit: 0,
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
        state.information = {
          ...state.information,
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
      state.showBookingDetails = state.preBookingNonAccountDetailsData.filter(
        (items) =>
          items.b_id === payload.b_id &&
          items.std_id === payload.std_id &&
          items.td_id === payload.td_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let findItemsGG = state.showBookingDetails.find(
        (items) =>
          items.sub_status === "pending" &&
          new Date(items.booking_timecancel).getTime() - new Date().getTime() >
            0
      );
      if (findItemsGG) {
        state.findPendingBooking = "pending";
      } else {
        state.findPendingBooking = "";
      }
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
        let findItems = state.showOtherBookingDetails.find(
          (items) =>
            items.sub_status === "pending" &&
            new Date(items.booking_timecancel).getTime() -
              new Date().getTime() >
              0
        );
        if (findItems) {
          state.findPendingOtherBooking = "pending";
        } else {
          state.findPendingOtherBooking = "";
        }
      } else {
        state.otherDetailsState = false;
      }
      state.information.total = otherDataSameBooking.reduce(
        (sum, items) =>
          items.sub_status === "pending" ||
          items.sub_status === "ຍັງບໍ່ເຕະ" ||
          items.sub_status === "ເຕະແລ້ວ"
            ? sum + items.sp_price
            : sum,
        0
      );
      state.information.totalDeposit =
        (state.information.total * parseInt(payload.percent_of_deposit)) / 100;
    },
    onConfirmApprovingBooking: (state, { payload }) => {
      let afterApproving = [];
      afterApproving = state.preBookingNonAccountDetailsData.filter(
        (items) => items.b_id !== payload
      );
      if (afterApproving.length > 0) {
        state.preBookingNonAccountDetailsData = afterApproving;
        state.preBookingNonAccountDetailsSuccess = true;
        state.cancelNonAccountSuccess = true;
        state.activeApproveSuccess = true;
        state.unActiveApproveSuccess = true;
      } else {
        state.preBookingNonAccountDetailsData = [];
        state.preBookingNonAccountDetailsSuccess = false;
        state.cancelNonAccountSuccess = false;
        state.activeApproveSuccess = false;
        state.unActiveApproveSuccess = false;
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
    onLoadPreActiveBooking: (state, { payload }) => {
      state.activeApproveData = state.preBookingNonAccountDetailsData.filter(
        (items) =>
          items.sub_status === payload || items.approve_state === "active"
      );
      if (state.activeApproveData.length > 0) {
        state.activeApproveSuccess = true;
      } else {
        state.activeApproveSuccess = false;
      }
    },
    onLoadPrePendingBooking: (state, { payload }) => {
      state.unActiveApproveData = state.preBookingNonAccountDetailsData.filter(
        (items) => items.approve_state === payload
      );
      if (state.unActiveApproveData.length > 0) {
        state.unActiveApproveSuccess = true;
      } else {
        state.unActiveApproveSuccess = false;
      }
    },
    onLoadPreVoidBooking: (state, { payload }) => {
      state.voidBookingNonAcountData =
        state.preBookingNonAccountDetailsData.filter(
          (items) => items.approve_state === payload
        );
      if (state.voidBookingNonAcountData.length > 0) {
        state.voidBookingNonAccountSuccess = true;
      } else {
        state.voidBookingNonAccountSuccess = false;
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
          state.preBookingNonAccountDetailsData = action.payload.map(
            (items) => ({
              ...items,
              approve_state:
                (new Date(items.booking_timecancel).getTime() -
                  new Date().getTime() <
                  0 &&
                  items.approve_state === "pending") ||
                items.sub_status === "void"
                  ? "void"
                  : items.approve_state,
            })
          );
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
          state.cancelNonAccountData = [];
          state.cancelNonAccountData = action.payload.map((items) => ({
            ...items,
            approve_state:
              (new Date(items.booking_timecancel).getTime() -
                new Date().getTime() <
                0 &&
                items.approve_state === "pending" &&
                items.sub_status === "pending") ||
              items.sub_status === "void"
                ? "void"
                : items.approve_state,
          }));
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
          state.cancelNonAccountData = [];
        }
      }
    );

    //ປັບສະຖານະຢູ່ລາຍລະອຽດການຈອງ
    builder.addCase(fetchApproveBookingSubStatus.pending, (state, action) => {
      state.activeApproveLoading = true;
    });
    builder.addCase(fetchApproveBookingSubStatus.fulfilled, (state, action) => {
      state.activeApproveLoading = false;
      state.activeApproveSuccess = true;
    });
    builder.addCase(fetchApproveBookingSubStatus.rejected, (state, action) => {
      state.activeApproveLoading = false;
      state.activeApproveError = action.payload;
    });

    //ອະນຸມັດການຈອງ
    builder.addCase(fetchConfirmApprovingBooking.pending, (state, action) => {
      state.activeApproveLoading = true;
    });
    builder.addCase(fetchConfirmApprovingBooking.fulfilled, (state, action) => {
      state.activeApproveLoading = false;
      state.activeApproveSuccess = true;
      state.preBookingNonAccountDetailsSuccess = true;
      state.cancelNonAccountSuccess = true;
      state.activeApproveSuccess = true;
      state.unActiveApproveSuccess = true;
      state.voidBookingNonAccountSuccess = true;
      state.preBookingNonAccountDetailsData = [];
      state.preBookingNonAccountDetailsData = action.payload.map((items) => ({
        ...items,
        approve_state:
          (new Date(items.booking_timecancel).getTime() - new Date().getTime() <
            0 &&
            items.approve_state === "pending" &&
            items.sub_status === "pending") ||
          items.sub_status === "void"
            ? "void"
            : items.approve_state,
      }));
    });
    builder.addCase(fetchConfirmApprovingBooking.rejected, (state, action) => {
      state.activeApproveLoading = false;
      state.activeApproveError = action.payload;
    });

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

export const {
  onShowBookingDetails,
  onCancelBookingNonAccount,
  onConfirmApprovingBooking,
  onLoadPreActiveBooking,
  onLoadPrePendingBooking,
  onLoadPreVoidBooking,
} = preBookingNonAccountSlice.actions;
export default preBookingNonAccountSlice.reducer;
