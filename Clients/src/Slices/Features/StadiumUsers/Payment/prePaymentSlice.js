import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetAllBooking,
  fetchGetAllBookingDetails,
} from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";
import moment from "moment";

const initialState = {
  getAllBookingDetailsLoading: false,
  getAllBookingLoading: false,
  getAllBookingData: [],
  getAllBookingDetailsData: [],
  foundUnCheckoutNonAccount: [],
  filterResultNonAccount: [],
  filterResultByStadiumsNonAccount: [],
  allTimesByStadiumsNonAccount: [],
  stadiumsSelectedNonAccount: "",
  filterByDateDataNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  getAllBookingSuccess: null,
  getAllBookingError: null,
  getAllBookingRequestId: undefined,
  getAllBookingDetailsSuccess: null,
  getAllBookingDetailsError: null,
  getAllBookingDetailsRequestId: undefined,
  customerInfo: {
    bookingId: "",
    customerfirstName: "",
    customerlastName: "",
    customerType: "",
    customerTel: "",
  },
};

const prePaymentSlice = createSlice({
  name: "getStadiumsToBookingNonAccount",
  initialState,
  reducers: {
    onClearBookingForPayment: (state) => {
      state.getAllBookingDetailsData = [];
    },
    onShowCustomerInfo: (state, { payload }) => {
      let foundData = state.getAllBookingData.find(
        (items) => items.b_id === payload.b_id
      );
      if (foundData && foundData.profile === "ໂທຈອງ") {
        state.customerInfo = {
          ...state.customerInfo,
          bookingId: foundData.b_id,
          customerfirstName: foundData.c_name,
          customerlastName: foundData.c_surname,
          customerType: "ໂທຈອງ",
          customerTel: foundData.c_phone,
        };
      } else {
        state.customerInfo = {
          ...state.customerInfo,
          bookingId: foundData.b_id,
          customerfirstName: foundData.c_name,
          customerlastName: foundData.c_surname,
          customerType: "ຈອງຜ່ານເວັບ",
          customerTel: foundData.c_phone,
        };
      }
    },
    onFilterBookingForPayment: (state, { payload }) => {
      if (state.filterByDateDataNonAccount !== payload.dateData) {
        state.filterByDateDataNonAccount = payload.dateData;
      }

      if (state.stadiumsSelectedNonAccount !== payload.stadiumId) {
        state.stadiumsSelectedNonAccount = payload.stadiumId;
      }
      state.foundUnCheckoutNonAccount = state.getAllBookingData.filter(
        (items) =>
          moment(items.kickoff_date).format("YYYY-MM-DD") ===
          state.filterByDateDataNonAccount
      );

      if (state.foundUnCheckoutNonAccount.length > 0) {
        state.filterResultNonAccount = state.getAllBookingDetailsData.filter(
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
            state.getAllBookingDetailsData.filter(
              (items) => items.std_id === state.stadiumsSelectedNonAccount
            );
        }
      }
    },
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(fetchGetAllBooking.pending, (state, action) => {
      state.getAllBookingLoading = true;
      if (state.getAllBookingLoading === true) {
        state.getAllBookingRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetAllBooking.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.getAllBookingLoading === true &&
        state.getAllBookingRequestId === requestId
      ) {
        state.getAllBookingSuccess = true;
        state.getAllBookingLoading = false;
        state.getAllBookingRequestId = undefined;
        state.getAllBookingData = [];
        state.getAllBookingData = action.payload;
      }
    });
    builder.addCase(fetchGetAllBooking.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.getAllBookingLoading === true &&
        state.getAllBookingRequestId === requestId
      ) {
        state.getAllBookingLoading = false;
        state.getAllBookingSuccess = false;
        state.getAllBookingRequestId = undefined;
        state.getAllBookingError = action.payload;
      }
    });

    builder.addCase(fetchGetAllBookingDetails.pending, (state, action) => {
      state.getAllBookingDetailsLoading = true;
      if (state.getAllBookingDetailsLoading === true) {
        state.getAllBookingDetailsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetAllBookingDetails.fulfilled, (state, action) => {
      if (
        state.getAllBookingDetailsLoading === true &&
        state.getAllBookingDetailsRequestId === action.meta.requestId
      ) {
        state.getAllBookingDetailsLoading = false;
        state.getAllBookingDetailsRequestId = undefined;
        state.getAllBookingDetailsSuccess = true;
        state.getAllBookingDetailsData = [];
        state.getAllBookingDetailsData = action.payload;
      }
    });
    builder.addCase(fetchGetAllBookingDetails.rejected, (state, action) => {
      if (
        state.getAllBookingDetailsLoading === true &&
        state.getAllBookingDetailsRequestId === action.meta.requestId
      ) {
        state.getAllBookingDetailsLoading = false;
        state.getAllBookingDetailsRequestId = undefined;
        state.getAllBookingDetailsSuccess = false;
        state.getAllBookingDetailsError = action.payload;
        state.getAllBookingDetailsData = [];
      }
    });
  },
});

export const {
  onClearBookingForPayment,
  onShowCustomerInfo,
  onFilterBookingForPayment,
} = prePaymentSlice.actions;
export default prePaymentSlice.reducer;
