import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddPaymentFields,
  fetchAddPaymentWaters,
  fetchUpdateBookingStatus,
  fetchUpdateBookingSubStatus,
  fetchConfirmPayment,
} from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";

const initialState = {
  paymentDetailsLoading: false,
  paymentDetailsSuccess: null,
  paymentDetailsData: [],
  selectedPaymentState: null,
  selectedWaterState: null,
  paymentDetailsSelected: [],
  addQtyWater: 0,
  updateQtyWater: 0,
  waterSelecting: [],
  waterDetailsData: [],
  waterDetailsSelected: [],
  totalStadiumPrice: 0,
  totalWaterPrice: 0,
  baseTotal: 0,
  total: 0,
  totalDeposit: 0,
  getMoney: 0,
  thonMoney: 0,
  paymentDetailsError: null,
  paymentDetailsRequestId: undefined,
  onlyWater: null,
  updateLoading: false,
  updateError: null,
  updateSucces: null,
  updateDetailsLoading: false,
  updateDetailsSuccess: null,
  updateDetailsError: null,
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
      state.totalDeposit = parseInt(payload.deposit_price);
      state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
      state.total =
        state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      state.thonMoney =
        parseInt(state.getMoney) -
        (parseInt(state.totalStadiumPrice) +
          parseInt(state.totalWaterPrice) -
          state.totalDeposit);
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
      state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
      state.total =
        state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      state.thonMoney =
        parseInt(state.getMoney) -
        (parseInt(state.totalStadiumPrice) +
          parseInt(state.totalWaterPrice) -
          state.totalDeposit);
      state.paymentDetailsSelected = [];
      if (state.paymentDetailsData.length === 0) {
        state.selectedPaymentState = false;
        state.totalDeposit = 0;
        state.totalStadiumPrice = 0;
        state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
        state.total =
          state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      }
    },

    //ສຳລັບການຈັດການຂອງບິນນ້ຳ

    onAddQtyWater: (state, { payload }) => {
      state.addQtyWater = parseInt(payload);
      if (state.waterSelecting.length > 0) {
        state.waterSelecting = state.waterSelecting.map((items) => ({
          ...items,
          qty: state.addQtyWater,
        }));
      }
    },

    onUpdateQtyWater: (state, { payload }) => {},

    onHandleClickWaters: (state, { payload }) => {
      const selectedIndex = state.waterSelecting.findIndex(
        (items) => items.stw_id === payload.stw_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.waterSelecting, payload);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.waterSelecting.slice(1));
      } else if (selectedIndex === state.waterSelecting.length - 1) {
        newSelected = newSelected.concat(state.waterSelecting.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.waterSelecting.slice(0, selectedIndex),
          state.waterSelecting.slice(selectedIndex + 1)
        );
      }
      state.waterSelecting = newSelected;
    },

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
      if (state.waterDetailsData.length > 0) {
        //ການບວກຈຳນວນເຄື່ອງດື່ມທີ່ມີ id ຄືກັນຫຼາຍຕົວ
        let combineArray = [];
        combineArray = combineArray.concat(state.waterDetailsData, payload);
        state.waterDetailsData = combineArray.reduce((acc, obj) => {
          let foundItem = acc.find((items) => items.stw_id === obj.stw_id);
          if (foundItem) {
            foundItem.qty += obj.qty;
            return acc;
          }
          acc.push(obj);
          return acc;
        }, []);
        state.waterSelecting = [];
      } else {
        let addArray = [];
        addArray = addArray.concat(state.waterDetailsData, payload);
        state.waterDetailsData = addArray;
        state.waterSelecting = [];
      }

      state.totalWaterPrice = state.waterDetailsData.reduce(
        (sum, items) => items.stw_price * items.qty + sum,
        0
      );
      state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
      state.total =
        state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      state.thonMoney =
        parseInt(state.getMoney) -
        (parseInt(state.totalStadiumPrice) +
          parseInt(state.totalWaterPrice) -
          state.totalDeposit);
    },
    onClearWaterDetails: (state) => {
      state.waterDetailsSelected = [];
    },

    onUpdateSelectedWaterDetails: (state, { payload }) => {
      state.waterDetailsData = state.waterDetailsData.map((items) =>
        items.stw_id === payload.stw_id ? { ...items, qty: payload.qty } : items
      );

      state.totalWaterPrice = state.waterDetailsData.reduce(
        (sum, items) => sum + items.stw_price * items.qty,
        0
      );
      state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
      state.total =
        state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      state.thonMoney =
        parseInt(state.getMoney) -
        (parseInt(state.totalStadiumPrice) +
          parseInt(state.totalWaterPrice) -
          state.totalDeposit);
      state.waterDetailsSelected = [];
    },
    onDeleteSelectedWaterData: (state, { payload }) => {
      state.waterDetailsData = state.waterDetailsData.filter(
        (items1) => !payload.some((items2) => items1.stw_id === items2.stw_id)
      );
      state.totalWaterPrice = state.waterDetailsData.reduce(
        (sum, items) => sum + items.stw_price * items.qty,
        0
      );
      state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
      state.total =
        state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      state.thonMoney =
        parseInt(state.getMoney) -
        (parseInt(state.totalStadiumPrice) +
          parseInt(state.totalWaterPrice) -
          state.totalDeposit);
      state.waterDetailsSelected = [];
      if (state.waterDetailsData.length === 0) {
        state.selectedWaterState = false;
        state.totalWaterPrice = 0;
        state.baseTotal = state.totalStadiumPrice + state.totalWaterPrice;
        state.total =
          state.totalStadiumPrice + state.totalWaterPrice - state.totalDeposit;
      }
    },
    onSaveGetMoney: (state, { payload }) => {
      state.getMoney = parseInt(payload);
      state.thonMoney =
        parseInt(payload) -
        (parseInt(state.totalStadiumPrice) +
          parseInt(state.totalWaterPrice) -
          parseInt(state.totalDeposit));
    },
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເພີ່ມລາຍລະອຽດການຈອງເດີ່ນ
    builder.addCase(fetchAddPaymentFields.pending, (state, action) => {
      state.paymentDetailsLoading = true;
    });
    builder.addCase(fetchAddPaymentFields.fulfilled, (state, action) => {
      state.paymentDetailsSuccess = true;
      state.paymentDetailsLoading = false;
    });
    builder.addCase(fetchAddPaymentFields.rejected, (state, action) => {
      state.paymentDetailsLoading = false;
      state.paymentDetailsSuccess = false;
      state.paymentDetailsError = action.payload;
    });

    //ການສົ່ງ request ໃນການເພີ່ມຂໍ້ມູນຊຳລະເຄື່ອງດື່ມ
    builder.addCase(fetchAddPaymentWaters.pending, (state, action) => {
      state.paymentDetailsLoading = true;
    });
    builder.addCase(fetchAddPaymentWaters.fulfilled, (state, action) => {
      state.paymentDetailsSuccess = true;
      state.paymentDetailsLoading = false;
    });
    builder.addCase(fetchAddPaymentWaters.rejected, (state, action) => {
      state.paymentDetailsLoading = false;
      state.paymentDetailsSuccess = false;
      state.paymentDetailsError = action.payload;
    });

    //ການສົ່ງ request ໃນການ update ສະຖານະຂອງການຈອງ
    builder.addCase(fetchUpdateBookingStatus.pending, (state, action) => {
      state.updateLoading = true;
    });
    builder.addCase(fetchUpdateBookingStatus.fulfilled, (state, action) => {
      state.updateSucces = true;
      state.updateLoading = false;
    });
    builder.addCase(fetchUpdateBookingStatus.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateSucces = false;
      state.updateError = action.payload;
    });

    //ການສົ່ງ request ໃນການ update ສະຖານະລາຍລະອຽດການຈອງ
    builder.addCase(fetchUpdateBookingSubStatus.pending, (state, action) => {
      state.updateDetailsLoading = true;
    });
    builder.addCase(fetchUpdateBookingSubStatus.fulfilled, (state, action) => {
      state.updateDetailsSuccess = true;
      state.updateDetailsLoading = false;
    });
    builder.addCase(fetchUpdateBookingSubStatus.rejected, (state, action) => {
      state.updateDetailsLoading = false;
      state.updateDetailsSuccess = false;
      state.updateDetailsError = action.payload;
    });

    //ການສົ່ງ request ໃນການເຢືນຢັນການຊຳລະເງິນ
    builder.addCase(fetchConfirmPayment.pending, (state, action) => {
      state.paymentDetailsLoading = true;
    });
    builder.addCase(fetchConfirmPayment.fulfilled, (state, action) => {
      state.paymentDetailsSuccess = true;
      state.paymentDetailsLoading = false;
      state.totalStadiumPrice = 0;
      state.paymentDetailsSelected = [];
      state.paymentDetailsData = [];
      state.waterDetailsData = [];
      state.waterDetailsData = [];
      state.selectedPaymentState = false;
    });
    builder.addCase(fetchConfirmPayment.rejected, (state, action) => {
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
  onAddQtyWater,
  onUpdateQtyWater,
  onHandleClickWaters,
  onSelectedWaterDetails,
  onSelectedAllWaterDetails,
  onSaveSelectedWater,
  onClearWaterDetails,
  onUpdateSelectedWaterDetails,
  onDeleteSelectedWaterData,
  onSaveGetMoney,
} = paymentDetailsSlice.actions;
export default paymentDetailsSlice.reducer;
