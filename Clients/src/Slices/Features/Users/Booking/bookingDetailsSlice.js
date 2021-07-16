import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddBookingFields,
  fetchGetBookingDetailsUnCheckout,
} from "../../../../middlewares/user/fetchBooking/fetchBooking";

const initialState = {
  bookingDetailsLoading: false,
  bookingDetailsSuccess: null,
  bookingDetailsData: [],
  timeAndPriceSelected: [],
  bookingDetailsSelected: [],
  bookingDetailsError: null,
  bookingDetailsRequestId: undefined,
};

const bookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    onHandleSelect: (state, { payload }) => {
      const selectedIndex = state.timeAndPriceSelected.findIndex(
        (items) => items.td_id === payload.td_id && items.std_id === payload.std_id
      );
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.timeAndPriceSelected, payload);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.timeAndPriceSelected.slice(1));
      } else if (selectedIndex === state.timeAndPriceSelected.length - 1) {
        newSelected = newSelected.concat(state.timeAndPriceSelected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.timeAndPriceSelected.slice(0, selectedIndex),
          state.timeAndPriceSelected.slice(selectedIndex + 1)
        );
      }
      state.timeAndPriceSelected = newSelected;
    },
    onHandleSelectAll: (state, { payload }) => {
      const newSelecteds = payload.map((n) => n);
      state.timeAndPriceSelected = newSelecteds;
    },
    onClearSelect: (state) => {
      state.timeAndPriceSelected = [];
    },
    onSaveSelectedData: (state, { payload }) => {
      state.bookingDetailsSelected = payload;
    },
    onDeleteSelectedData: (state, { payload }) => {
      return state.bookingDetailsSelected.filter((items) => items.std_id !== payload.std_id && items.td_id !== items.td_id);
    }
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(
      fetchGetBookingDetailsUnCheckout.pending,
      (state, action) => {
        state.bookingDetailsLoading = true;
        if (state.bookingDetailsLoading === true) {
          state.bookingDetailsRequestId = action.meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchGetBookingDetailsUnCheckout.fulfilled,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.bookingDetailsLoading === true &&
          state.bookingDetailsRequestId === requestId
        ) {
          state.bookingDetailsSuccess = true;
          state.bookingDetailsLoading = false;
          state.bookingDetailsRequestId = undefined;
          state.bookingDetailsData = [];
          state.bookingDetailsData = action.payload;
        }
      }
    );
    builder.addCase(
      fetchGetBookingDetailsUnCheckout.rejected,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.bookingDetailsLoading === true &&
          state.bookingDetailsRequestId === requestId
        ) {
          state.bookingDetailsLoading = false;
          state.bookingDetailsSuccess = false;
          state.bookingDetailsRequestId = undefined;
          state.bookingDetailsError = action.payload;
        }
      }
    );

    //ການສົ່ງ request ໃນການເພີ່ມລາຍລະອຽດການຈອງເດີ່ນ
    builder.addCase(fetchAddBookingFields.pending, (state, action) => {
      state.bookingDetailsLoading = true;
    });
    builder.addCase(fetchAddBookingFields.fulfilled, (state, action) => {
      state.bookingDetailsSuccess = true;
      state.bookingDetailsLoading = false;
    });
    builder.addCase(fetchAddBookingFields.rejected, (state, action) => {
      state.bookingDetailsLoading = false;
      state.bookingDetailsSuccess = false;
      state.bookingDetailsError = action.payload;
    });
  },
});

export const { onHandleSelect, onHandleSelectAll, onClearSelect, onSaveSelectedData, onDeleteSelectedData } =
  bookingDetailsSlice.actions;
export default bookingDetailsSlice.reducer;
