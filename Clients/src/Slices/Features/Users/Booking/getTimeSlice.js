import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetTimesToBooking,
  fetchGetBookingDetailsUnCheckout,
} from "../../../../middlewares/user/fetchBooking/fetchBooking";
import moment from "moment";

const initialState = {
  bookingTimesLoading: false,
  bookingUnCheckoutLoading: false,
  bookingUnCheckoutData: [],
  bookingTimesData: [],
  foundUnCheckout: [],
  filterResult: [],
  filterResultByStadiums: [],
  allTimesByStadiums: [],
  stadiumsSelected: "",
  filterByDateData: moment(Date.now()).format("YYYY-MM-DD"),
  bookingUnCheckoutSuccess: null,
  bookingUnCheckoutError: null,
  bookingUnCheckoutRequestId: undefined,
  bookingTimesSuccess: null,
  bookingTimesError: null,
  bookingTimesRequestId: undefined,
};

const getTimesSlice = createSlice({
  name: "getStadiumsToBooking",
  initialState,
  reducers: {
    onClearTimes: (state) => {
      state.bookingTimesData = [];
    },
    onFilterAvailableTimes: (state, { payload }) => {
      if (state.filterByDateData !== payload.dateData) {
        state.filterByDateData = payload.dateData;
      }

      if (state.stadiumsSelected !== payload.stadiumId) {
        state.stadiumsSelected = payload.stadiumId;
      }
      state.foundUnCheckout = state.bookingUnCheckoutData.filter(
        (items) =>
          moment(items.kickoff_date).format("YYYY-MM-DD") ===
          state.filterByDateData
      );
      if (state.foundUnCheckout.length > 0) {
        state.filterResult = state.bookingTimesData.filter(
          (items1) =>
            !state.foundUnCheckout.some(
              (items2) =>
                items1.std_id === items2.std_id && items1.td_id === items2.td_id
            )
        );
        if (state.stadiumsSelected !== "") {
          state.filterResultByStadiums = state.filterResult.filter(
            (items) => items.std_id === state.stadiumsSelected
          );
        }
      } else {
        if (state.stadiumsSelected !== "") {
          state.allTimesByStadiums = state.bookingTimesData.filter(
            (items) => items.std_id === state.stadiumsSelected
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ
    builder.addCase(
      fetchGetBookingDetailsUnCheckout.pending,
      (state, action) => {
        state.bookingUnCheckoutLoading = true;
        if (state.bookingUnCheckoutLoading === true) {
          state.bookingUnCheckoutRequestId = action.meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchGetBookingDetailsUnCheckout.fulfilled,
      (state, { payload, meta }) => {
        const { requestId } = meta;
        if (
          state.bookingUnCheckoutLoading === true &&
          state.bookingUnCheckoutRequestId === requestId
        ) {
          state.bookingUnCheckoutSuccess = true;
          state.bookingUnCheckoutLoading = false;
          state.bookingUnCheckoutRequestId = undefined;
          state.bookingUnCheckoutData = [];
          state.bookingUnCheckoutData = payload;
        }
      }
    );
    builder.addCase(
      fetchGetBookingDetailsUnCheckout.rejected,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.bookingUnCheckouLoading === true &&
          state.bookingUnCheckouRequestId === requestId
        ) {
          state.bookingUnCheckouLoading = false;
          state.bookingUnCheckouSuccess = false;
          state.bookingUnCheckouRequestId = undefined;
          state.bookingUnCheckouError = action.payload;
        }
      }
    );

    builder.addCase(fetchGetTimesToBooking.pending, (state, action) => {
      state.bookingTimesLoading = true;
      if (state.bookingTimesLoading === true) {
        state.bookingTimesRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetTimesToBooking.fulfilled, (state, action) => {
      if (
        state.bookingTimesLoading === true &&
        state.bookingTimesRequestId === action.meta.requestId
      ) {
        state.bookingTimesLoading = false;
        state.bookingTimesRequestId = undefined;
        state.bookingTimesSuccess = true;
        state.bookingTimesData = [];
        state.bookingTimesData = action.payload;
      }
    });
    builder.addCase(fetchGetTimesToBooking.rejected, (state, action) => {
      if (
        state.bookingTimesLoading === true &&
        state.bookingTimesRequestId === action.meta.requestId
      ) {
        state.bookingTimesLoading = false;
        state.bookingTimesRequestId = undefined;
        state.bookingTimesSuccess = false;
        state.bookingTimesError = action.payload;
        state.bookingTimesData = [];
      }
    });
  },
});

export const { onClearTimes, onFilterAvailableTimes } = getTimesSlice.actions;
export default getTimesSlice.reducer;
