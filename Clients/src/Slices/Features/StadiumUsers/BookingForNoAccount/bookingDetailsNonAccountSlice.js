import { createSlice } from "@reduxjs/toolkit";
import { fetchAddBookingFieldsNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import moment from "moment";

const initialState = {
  bookingDetailsNonAccountLoading: false,
  bookingDetailsNonAccountSuccess: null,
  bookingDetailsNonAccountData: [],
  dateSelectedNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  timeAndPriceSelectedNonAccount: [],
  alertSelectedNonAccount: [],
  selectedStateNonAccount: null,
  bookingDetailsSelectedNonAccount: [],
  bookingDetailsNonAccountError: null,
  bookingDetailsNonAccountRequestId: undefined,
};

const bookingDetailsNonAccountSlice = createSlice({
  name: "bookingDetailsNonAccount",
  initialState,
  reducers: {
    onHandleSelectDateNonAccount: (state, { payload }) => {
      state.dateSelectedNonAccount = payload;
    },
    onHandleSelectNonAccount: (state, { payload }) => {
      const selectedIndex = state.timeAndPriceSelectedNonAccount.findIndex(
        (items) =>
          items.td_id === payload.td_id && items.std_id === payload.std_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(
          state.timeAndPriceSelectedNonAccount,
          payload
        );
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(
          state.timeAndPriceSelectedNonAccount.slice(1)
        );
      } else if (
        selectedIndex ===
        state.timeAndPriceSelectedNonAccount.length - 1
      ) {
        newSelected = newSelected.concat(
          state.timeAndPriceSelectedNonAccount.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.timeAndPriceSelectedNonAccount.slice(0, selectedIndex),
          state.timeAndPriceSelectedNonAccount.slice(selectedIndex + 1)
        );
      }
      state.timeAndPriceSelectedNonAccount = newSelected;
    },
    onHandleSelectAllNonAccount: (state, { payload }) => {
      const newSelecteds = payload.map((n) => n);
      state.timeAndPriceSelectedNonAccount = newSelecteds;
    },
    onClearSelectNonAccount: (state) => {
      state.timeAndPriceSelectedNonAccount = [];
    },
    onLoadCurrentSaveSelectedDataNonAccount: (state) => {
      if (state.bookingDetailsSelectedNonAccount.length > 0) {
        state.selectedStateNonAccount = true
        return
      }
      state.selectedStateNonAccount = false;
    },
    onShowAlertSameDataNonAccount: (state, { payload }) => {
      state.alertSelectedNonAccount = payload;
    },
    onSaveSelectedDataNonAccount: (state, { payload }) => {
      state.selectedStateNonAccount = true;
      let newSelected = [];
      newSelected = newSelected.concat(state.bookingDetailsSelectedNonAccount, payload);
      state.bookingDetailsSelectedNonAccount = newSelected;
    },
    onDeleteSelectedDataNonAccount: (State, { payload }) => {},
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເພີ່ມລາຍລະອຽດການຈອງເດີ່ນ
    builder.addCase(
      fetchAddBookingFieldsNonAccount.pending,
      (state, action) => {
        state.bookingDetailsNonAccountLoading = true;
      }
    );
    builder.addCase(
      fetchAddBookingFieldsNonAccount.fulfilled,
      (state, action) => {
        state.bookingDetailsNonAccountSuccess = true;
        state.bookingDetailsNonAccountLoading = false;
      }
    );
    builder.addCase(
      fetchAddBookingFieldsNonAccount.rejected,
      (state, action) => {
        state.bookingDetailsNonAccountLoading = false;
        state.bookingDetailsNonAccountSuccess = false;
        state.bookingDetailsNonAccountError = action.payload;
      }
    );
  },
});

export const {
  onHandleSelectDateNonAccount,
  onHandleSelectNonAccount,
  onHandleSelectAllNonAccount,
  onClearSelectNonAccount,
  onShowAlertSameDataNonAccount,
  onLoadCurrentSaveSelectedDataNonAccount,
  onSaveSelectedDataNonAccount,
  onDeleteSelectedDataNonAccount,
} = bookingDetailsNonAccountSlice.actions;
export default bookingDetailsNonAccountSlice.reducer;
