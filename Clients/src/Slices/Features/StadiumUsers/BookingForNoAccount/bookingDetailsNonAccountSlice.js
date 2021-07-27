import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddBookingFieldsNonAccount,
  fetchAddUserNonAccount,
  fetchConfirmBookingNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import moment from "moment";

const initialState = {
  bookingDetailsNonAccountLoading: false,
  bookingDetailsNonAccountSuccess: null,
  bookingDetailsNonAccountData: [],
  dateSelectedNonAccount: moment(Date.now()).format("YYYY-MM-DD"),
  timeAndPriceSelectedNonAccount: [],
  alertSelectedNonAccount: [],
  alertCompareTimeNonAccount: [],
  selectedStateNonAccount: null,
  bookingDetailsSelectedNonAccount: [],
  totalPriceNonAccount: 0,
  bookingDetailsNonAccountError: null,
  bookingDetailsNonAccountRequestId: undefined,
  userNonAccount: {
    bookingId: "",
    firstName: "",
    lastName: "",
    team: "",
    tel: "",
  },
};

const bookingDetailsNonAccountSlice = createSlice({
  name: "bookingDetailsNonAccount",
  initialState,
  reducers: {
    onHandleSelectDateNonAccount: (state, { payload }) => {
      if (state.dateSelectedNonAccount !== payload) {
        let changeDate = [];
        changeDate = state.timeAndPriceSelectedNonAccount.filter(
          (items1) =>
            !state.bookingDetailsNonAccountData.some(
              (items2) =>
                items1.std_id === items2.std_id &&
                items1.td_id === items2.td_id &&
                items1.kickoff_date === items2.kickoff_date
            )
        );
        state.timeAndPriceSelectedNonAccount = changeDate.map((items) => ({
          ...items,
          kickoff_date: payload,
        }));
      }
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
      if (state.bookingDetailsNonAccountData.length > 0) {
        state.selectedStateNonAccount = true;
        return;
      }
      state.selectedStateNonAccount = false;
    },
    onShowAlertSameDataNonAccount: (state, { payload }) => {
      state.alertSelectedNonAccount = payload;
    },
    onShowAlertCompareTimeNonAccount: (state, { payload }) => {
      state.alertCompareTimeNonAccount = payload;
    },
    onSaveSelectedDataNonAccount: (state, { payload }) => {
      state.selectedStateNonAccount = true;
      let newSelected = [];
      newSelected = newSelected.concat(
        state.bookingDetailsNonAccountData,
        payload
      );
      state.bookingDetailsNonAccountData = newSelected;
      state.totalPriceNonAccount = state.bookingDetailsNonAccountData.reduce(
        (sum, items) => sum + items.sp_price,
        0
      );
    },
    onSelectedBookingDetailsNonAccount: (state, { payload }) => {
      const selectedIndex = state.bookingDetailsSelectedNonAccount.findIndex(
        (items) =>
          items.td_id === payload.td_id && items.std_id === payload.std_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(
          state.bookingDetailsSelectedNonAccount,
          payload
        );
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(
          state.bookingDetailsSelectedNonAccount.slice(1)
        );
      } else if (
        selectedIndex ===
        state.bookingDetailsSelectedNonAccount.length - 1
      ) {
        newSelected = newSelected.concat(
          state.bookingDetailsSelectedNonAccount.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.bookingDetailsSelectedNonAccount.slice(0, selectedIndex),
          state.bookingDetailsSelectedNonAccount.slice(selectedIndex + 1)
        );
      }
      state.bookingDetailsSelectedNonAccount = newSelected;
    },
    onSelectedAllBookingDetailsNonAccount: (state, { payload }) => {
      const newSelecteds = payload.map((n) => n);
      state.bookingDetailsSelectedNonAccount = newSelecteds;
    },
    onClearBookingDetailsNonAccount: (state) => {
      state.bookingDetailsSelectedNonAccount = [];
    },
    onDeleteSelectedDataNonAccount: (state, { payload }) => {
      state.bookingDetailsNonAccountData =
        state.bookingDetailsNonAccountData.filter(
          (items1) =>
            !payload.some(
              (items2) =>
                items1.std_id === items2.std_id &&
                items1.td_id === items2.td_id &&
                items1.kickoff_date === items2.kickoff_date
            )
        );
      state.timeAndPriceSelectedNonAccount =
        state.timeAndPriceSelectedNonAccount.filter(
          (items1) =>
            !payload.some(
              (items2) =>
                items1.std_id === items2.std_id &&
                items1.td_id === items2.td_id &&
                items1.kickoff_date === items2.kickoff_date
            )
        );
      state.totalPriceNonAccount = state.bookingDetailsNonAccountData.reduce(
        (sum, items) => sum + items.sp_price,
        0
      );
      state.bookingDetailsSelectedNonAccount = [];
      if (state.bookingDetailsNonAccountData.length === 0) {
        state.selectedStateNonAccount = false;
        state.totalPriceNonAccount = 0;
      }
    },
    onUserNonAccountInputing: (state, { payload }) => {
      state.userNonAccount = {
        ...state.userNonAccount,
        bookingId: payload.bookingId,
        [payload.name]: payload.value,
      };
    },
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

    //ການສົ່ງ request ໃນການເພີ່ມຂໍ້ມູນຂອງລູກຄ້າບໍ່ມີບັນຊີ
    builder.addCase(fetchAddUserNonAccount.pending, (state, action) => {
      state.bookingDetailsNonAccountLoading = true;
    });
    builder.addCase(fetchAddUserNonAccount.fulfilled, (state, action) => {
      state.bookingDetailsNonAccountSuccess = true;
      state.bookingDetailsNonAccountLoading = false;
    });
    builder.addCase(fetchAddUserNonAccount.rejected, (state, action) => {
      state.bookingDetailsNonAccountLoading = false;
      state.bookingDetailsNonAccountSuccess = false;
      state.bookingDetailsNonAccountError = action.payload;
    });

    //ການສົ່ງ request ໃນການເຢືນຢັນການຈອງເດີ່ນໃຫ້ລູກຄ້າບໍ່ມີບັນຊີ
    builder.addCase(fetchConfirmBookingNonAccount.pending, (state, action) => {
      state.bookingDetailsNonAccountLoading = true;
    });
    builder.addCase(
      fetchConfirmBookingNonAccount.fulfilled,
      (state, action) => {
        state.bookingDetailsNonAccountSuccess = true;
        state.bookingDetailsNonAccountLoading = false;
        state.totalPriceNonAccount = 0;
        state.bookingDetailsSelectedNonAccount = [];
        state.bookingDetailsNonAccountData = [];
        state.selectedStateNonAccount = false;
        state.timeAndPriceSelectedNonAccount = [];
        state.alertSelectedNonAccount = [];
      }
    );
    builder.addCase(fetchConfirmBookingNonAccount.rejected, (state, action) => {
      state.bookingDetailsNonAccountLoading = false;
      state.bookingDetailsNonAccountSuccess = false;
      state.bookingDetailsNonAccountError = action.payload;
    });
  },
});

export const {
  onHandleSelectDateNonAccount,
  onHandleSelectNonAccount,
  onHandleSelectAllNonAccount,
  onClearSelectNonAccount,
  onShowAlertSameDataNonAccount,
  onShowAlertCompareTimeNonAccount,
  onLoadCurrentSaveSelectedDataNonAccount,
  onSaveSelectedDataNonAccount,
  onSelectedBookingDetailsNonAccount,
  onSelectedAllBookingDetailsNonAccount,
  onClearBookingDetailsNonAccount,
  onDeleteSelectedDataNonAccount,
  onUserNonAccountInputing,
} = bookingDetailsNonAccountSlice.actions;
export default bookingDetailsNonAccountSlice.reducer;
