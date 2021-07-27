import { createSlice } from "@reduxjs/toolkit";
import { fetchAddBookingFields } from "../../../../middlewares/user/fetchBooking/fetchBooking";
import moment from "moment";

const initialState = {
  bookingDetailsLoading: false,
  bookingDetailsSuccess: null,
  bookingDetailsData: [],
  dateSelected: moment(Date.now()).format("YYYY-MM-DD"),
  timeAndPriceSelected: [],
  selectedState: null,
  alertSelected: [],
  alertCompareTime: [],
  bookingDetailsSelected: [],
  totalPrice: 0,
  bookingDetailsError: null,
  bookingDetailsRequestId: undefined,
};

const bookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    onHandleSelectDate: (state, { payload }) => {
      if (state.dateSelected !== payload) {
        let changeDate = [];
        changeDate = state.timeAndPriceSelected.filter(
          (items1) =>
            !state.bookingDetailsData.some(
              (items2) =>
                items1.std_id === items2.std_id &&
                items1.td_id === items2.td_id &&
                items1.kickoff_date === items2.kickoff_date
            )
        );
        state.timeAndPriceSelected = changeDate.map((items) => ({
          ...items,
          kickoff_date: payload,
        }));
      }
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
    onLoadCurrentSaveSelectedData: (state) => {
      if (state.bookingDetailsData.length > 0) {
        state.selectedState = true;
        return;
      }
      state.selectedState = false;
    },
    onShowAlertSameData: (state, { payload }) => {
      state.alertSelected = payload;
    },
    onShowAlertCompareTime: (state, { payload }) => {
      state.alertCompareTime = payload;
    },
    onSaveSelectedData: (state, { payload }) => {
      state.selectedState = true;
      let newSelected = [];
      newSelected = newSelected.concat(state.bookingDetailsData, payload);
      state.bookingDetailsData = newSelected;
      state.totalPrice = state.bookingDetailsData.reduce((sum, items) => sum + items.sp_price, 0);
    },
    onSelectedBookingDetails: (state, { payload }) => {
      const selectedIndex = state.bookingDetailsSelected.findIndex(
        (items) =>
          items.td_id === payload.td_id && items.std_id === payload.std_id
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.bookingDetailsSelected, payload);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.bookingDetailsSelected.slice(1));
      } else if (selectedIndex === state.bookingDetailsSelected.length - 1) {
        newSelected = newSelected.concat(
          state.bookingDetailsSelected.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.bookingDetailsSelected.slice(0, selectedIndex),
          state.bookingDetailsSelected.slice(selectedIndex + 1)
        );
      }
      state.bookingDetailsSelected = newSelected;
    },
    onSelectedAllBookingDetails: (state, { payload }) => {
      const newSelecteds = payload.map((n) => n);
      state.bookingDetailsSelected = newSelecteds;
    },
    onClearBookingDetails: (state) => {
      state.bookingDetailsSelected = [];
    },
    onDeleteSelectedData: (state, { payload }) => {
      state.bookingDetailsData = state.bookingDetailsData.filter(
        (items1) =>
          !payload.some(
            (items2) =>
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );
      state.timeAndPriceSelected = state.timeAndPriceSelected.filter(
        (items1) =>
          !payload.some(
            (items2) =>
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );
      state.totalPrice = state.bookingDetailsData.reduce((sum, items) => sum + items.sp_price, 0);
      state.bookingDetailsSelected = [];
      if (state.bookingDetailsData.length === 0) {
        state.selectedState = false;
        state.totalPrice = 0;
      }
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
  onShowAlertSameData,
  onShowAlertCompareTime,
  onLoadCurrentSaveSelectedData,
  onSaveSelectedData,
  onSelectedBookingDetails,
  onSelectedAllBookingDetails,
  onClearBookingDetails,
  onDeleteSelectedData,
} = bookingDetailsSlice.actions;
export default bookingDetailsSlice.reducer;
