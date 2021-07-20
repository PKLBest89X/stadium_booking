import { createSlice } from "@reduxjs/toolkit";
import { fetchAddBookingFields } from "../../../../middlewares/user/fetchBooking/fetchBooking";
import moment from "moment";

const initialState = {
  bookingDetailsLoading: false,
  bookingDetailsSuccess: null,
  bookingDetailsData: [],
  dateSelected: moment(Date.now()).format("YYYY-MM-DD"),
  timeAndPriceSelected: [],
  bookingDetailsSelected: [],
  bookingDetailsError: null,
  bookingDetailsRequestId: undefined,
};

const bookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    onHandleSelectDate: (state, { payload }) => {
      state.dateSelected = payload;
    },
    onHandleSelect: (state, { payload }) => {
      const selectedIndex = state.timeAndPriceSelected.findIndex(
        (items) =>
          items.td_id === payload.td_id && items.std_id === payload.std_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.timeAndPriceSelected, payload);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.timeAndPriceSelected.slice(1));
      } else if (selectedIndex === state.timeAndPriceSelected.length - 1) {
        newSelected = newSelected.concat(
          state.timeAndPriceSelected.slice(0, -1)
        );
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
      state.bookingDetailsSelected = state.bookingDetailsSelected.map(
        (items) => ({ ...items })
      );
    },
    onDeleteSelectedData: (state, { payload }) => {
      return state.bookingDetailsSelected.filter(
        (items) =>
          items.std_id !== payload.std_id && items.td_id !== payload.td_id
      );
    },
  },
  extraReducers: (builder) => {
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

export const {
  onHandleSelectDate,
  onHandleSelect,
  onHandleSelectAll,
  onClearSelect,
  onSaveSelectedData,
  onDeleteSelectedData,
} = bookingDetailsSlice.actions;
export default bookingDetailsSlice.reducer;
