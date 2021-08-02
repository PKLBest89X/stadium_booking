import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddBookingFieldsNonAccount,
  fetchAddUserNonAccount,
  fetchConfirmBookingNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";

const initialState = {
  paymentDetailsLoading: false,
  paymentDetailsSuccess: null,
  paymentDetailsData: [],
  selectedPaymentState: null,
  selectedWaterState: null,
  paymentDetailsSelected: [],
  waterDetailsData: [],
  waterDetailsSelected: [],
  totalStadiumPrice: 0,
  totalWaterPrice: 0,
  total: 0,
  getMoney: 0,
  paymentDetailsError: null,
  paymentDetailsRequestId: undefined,
  onlyWater: null,
};

const paymentDetailsSlice = createSlice({
  name: "paymentDetails",
  initialState,
  reducers: {
    onSellOnlyWater: (state) => {
      state.onlyWater = true;
    },
    onLoadCurrentSaveSelectedPayment: (state) => {
      if (state.paymentDetailsData.length > 0) {
        state.selectedPaymentState = true;
        return;
      } else state.selectedPaymentState = false;
      if (state.waterDetailsData.length > 0) {
        state.selectedWaterState = true;
        return;
      } else state.selectedWaterState = false;
    },
    onSaveSelectedPaymentData: (state, { payload }) => {
      state.selectedPaymentState = true;
      state.onlyWater = false;
      const selectedIndex = state.paymentDetailsData.findIndex(
        (items) =>
          items.td_id === payload.td_id &&
          items.std_id === payload.std_id &&
          items.b_id === payload.b_id &&
          items.kickoff_date === payload.kickoff_date
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        let foundBookingBill = [];
        foundBookingBill = state.paymentDetailsData.find(
          (items) => items.b_id !== payload.b_id
        );
        if (foundBookingBill) state.paymentDetailsData = [];
        newSelected = newSelected.concat(state.paymentDetailsData, payload);
      } else return;
      state.paymentDetailsData = newSelected;
      state.totalStadiumPrice = state.paymentDetailsData.reduce(
        (sum, items) => sum + items.sp_price,
        0
      );
      state.total = state.totalStadiumPrice + state.totalWaterPrice;
    },
    onSelectedPaymentDetails: (state, { payload }) => {
      const selectedIndex = state.paymentDetailsSelected.findIndex(
        (items) =>
          items.td_id === payload.td_id && items.std_id === payload.std_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.paymentDetailsSelected, payload);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.paymentDetailsSelected.slice(1));
      } else if (selectedIndex === state.paymentDetailsSelected.length - 1) {
        newSelected = newSelected.concat(
          state.paymentDetailsSelected.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.paymentDetailsSelected.slice(0, selectedIndex),
          state.paymentDetailsSelected.slice(selectedIndex + 1)
        );
      }
      state.paymentDetailsSelected = newSelected;
    },
    onSelectedAllPaymentDetails: (state, { payload }) => {
      const newSelecteds = payload.map((n) => n);
      state.paymentDetailsSelected = newSelecteds;
    },
    onClearPaymentDetails: (state) => {
      state.paymentDetailsSelected = [];
    },
    onDeleteSelectedPaymentData: (state, { payload }) => {
      state.paymentDetailsData = state.paymentDetailsData.filter(
        (items1) =>
          !payload.some(
            (items2) =>
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );
      state.totalStadiumPrice = state.paymentDetailsData.reduce(
        (sum, items) => sum + items.sp_price,
        0
      );
      state.total = state.totalStadiumPrice + state.totalWaterPrice;
      state.paymentDetailsSelected = [];
      if (state.paymentDetailsData.length === 0) {
        state.selectedPaymentState = false;
        state.totalStadiumPrice = 0;
        state.total = state.totalStadiumPrice + state.totalWaterPrice;
      }
    },

    //ສຳລັບການຈັດການຂອງບິນນ້ຳ
    onSelectedWaterDetails: (state, { payload }) => {
      const selectedIndex = state.waterDetailsSelected.findIndex(
        (items) => items.stw_id === payload.stw_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.waterDetailsSelected, payload);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.waterDetailsSelected.slice(1));
      } else if (selectedIndex === state.waterDetailsSelected.length - 1) {
        newSelected = newSelected.concat(
          state.waterDetailsSelected.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.waterDetailsSelected.slice(0, selectedIndex),
          state.waterDetailsSelected.slice(selectedIndex + 1)
        );
      }
      state.waterDetailsSelected = newSelected;
    },
    onSelectedAllWaterDetails: (state, { payload }) => {
      const newSelecteds = payload.map((n) => n);
      state.waterDetailsSelected = newSelecteds;
    },
    onSaveSelectedWater: (state, { payload }) => {
      state.selectedWaterState = true;
      state.waterDetailsData = state.waterDetailsData.map((items1) =>
        payload.some((items2) =>
          items1.stw_id === items2.stw_id
            ? { ...items1, qty: items1.qty + items2.qty }
            : items1
        )
      );
      state.totalWaterPrice = state.waterDetailsData.reduce(
        (sum, items) => (sum + items.sp_price) * items.qty,
        0
      );
      state.total = state.totalStadiumPrice + state.totalWaterPrice;
    },
    onClearWaterDetails: (state) => {
      state.waterDetailsSelected = [];
    },
    
    onUpdateSelectedWaterDetails: (state, { payload }) => {
      state.waterDetailsData = state.waterDetailsData.map((items) =>
        items.stw_id === payload.stw_id ? { ...items, qty: payload.qty } : items
      );
    },
    onDeleteSelectedWaterData: (state, { payload }) => {
      state.waterDetailsData = state.waterDetailsData.filter(
        (items1) =>
          !payload.some(
            (items2) =>
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );
      state.totalWaterPrice = state.waterDetailsData.reduce(
        (sum, items) => (sum + items.sp_price) * items.qty,
        0
      );
      state.total = state.totalStadiumPrice + state.totalWaterPrice;
      state.waterDetailsSelected = [];
      if (state.waterDetailsData.length === 0) {
        state.selectedWaterState = false;
        state.totalWaterPrice = 0;
        state.total = state.totalStadiumPrice + state.totalWaterPrice;
      }
    },
    onSaveGetMoney: (state, { payload }) => {
      state.getMoney = parseInt(payload);
    }
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເພີ່ມລາຍລະອຽດການຈອງເດີ່ນ
    builder.addCase(
      fetchAddBookingFieldsNonAccount.pending,
      (state, action) => {
        state.paymentDetailsLoading = true;
      }
    );
    builder.addCase(
      fetchAddBookingFieldsNonAccount.fulfilled,
      (state, action) => {
        state.paymentDetailsSuccess = true;
        state.paymentDetailsLoading = false;
      }
    );
    builder.addCase(
      fetchAddBookingFieldsNonAccount.rejected,
      (state, action) => {
        state.paymentDetailsLoading = false;
        state.paymentDetailsSuccess = false;
        state.paymentDetailsError = action.payload;
      }
    );

    //ການສົ່ງ request ໃນການເພີ່ມຂໍ້ມູນຂອງລູກຄ້າບໍ່ມີບັນຊີ
    builder.addCase(fetchAddUserNonAccount.pending, (state, action) => {
      state.paymentDetailsLoading = true;
    });
    builder.addCase(fetchAddUserNonAccount.fulfilled, (state, action) => {
      state.paymentDetailsSuccess = true;
      state.paymentDetailsLoading = false;
    });
    builder.addCase(fetchAddUserNonAccount.rejected, (state, action) => {
      state.paymentDetailsLoading = false;
      state.paymentDetailsSuccess = false;
      state.paymentDetailsError = action.payload;
    });

    //ການສົ່ງ request ໃນການເຢືນຢັນການຈອງເດີ່ນໃຫ້ລູກຄ້າບໍ່ມີບັນຊີ
    builder.addCase(fetchConfirmBookingNonAccount.pending, (state, action) => {
      state.paymentDetailsLoading = true;
    });
    builder.addCase(
      fetchConfirmBookingNonAccount.fulfilled,
      (state, action) => {
        state.paymentDetailsSuccess = true;
        state.paymentDetailsLoading = false;
        state.totalStadiumPrice = 0;
        state.paymentDetailsSelected = [];
        state.paymentDetailsData = [];
        state.waterDetailsData = [];
        state.waterDetailsData = [];
        state.selectedPaymentState = false;
      }
    );
    builder.addCase(fetchConfirmBookingNonAccount.rejected, (state, action) => {
      state.paymentDetailsLoading = false;
      state.paymentDetailsSuccess = false;
      state.paymentDetailsError = action.payload;
    });
  },
});

export const {
  onSellOnlyWater,
  onClearSelectDataForPayment,
  onLoadCurrentSaveSelectedPayment,
  onSaveSelectedPaymentData,
  onSelectedPaymentDetails,
  onSelectedAllPaymentDetails,
  onClearPaymentDetails,
  onDeleteSelectedPaymentData,
  onSelectedWaterDetails,
  onSelectedAllWaterDetails,
  onSaveSelectedWater,
  onClearWaterDetails,
  onUpdateSelectedWaterDetails,
  onDeleteSelectedWaterData,
  onSaveGetMoney
} = paymentDetailsSlice.actions;
export default paymentDetailsSlice.reducer;
