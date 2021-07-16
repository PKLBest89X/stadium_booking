import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetStadiumPrice,
  fetchGetStadiumsToAddPrice,
  fetchGetTimesToAddPrice,
  fetchAddStadiumPrice,
  fetchDeleteStadiumPrice,
} from "../../../../middlewares/stadiumUser/fetchCRUDStadiumPrice/fetchCRUDStadiumPrice";

const initialState = {
  priceLoading: false,
  getTimeLoading: false,
  priceData: [],
  getStadiumsData: [],
  getTimesData: [],
  priceError: null,
  priceSuccess: null,
  getStadiumsSuccess: null,
  getTimesSuccess: null,
  priceRequestId: undefined,
  getStadiumsRequestId: undefined,
  getTimesRequestId: undefined,
  priceAddError: null,
};

const stadiumPriceSlice = createSlice({
  name: "stadiumPrice",
  initialState,
  reducers: {
    onDeleteStadiumPrice: (state, { payload }) => {
      let afterDeletePrice = state.priceData.filter(
        (items) =>
          items.std_id !== payload.stadiums_id ||
          items.td_id !== payload.time_id
      );
      if (afterDeletePrice.length > 0) {
        state.priceData = afterDeletePrice;
        state.priceSuccess = true;
      } else {
        state.priceData = [];
        state.priceSuccess = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadiumPrice.pending, (state, action) => {
      state.priceLoading = true;
      if (state.priceLoading === true) {
        state.priceRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumPrice.fulfilled, (state, action) => {
      if (
        state.priceLoading === true &&
        state.priceRequestId === action.meta.requestId
      ) {
        state.priceLoading = false;
        state.priceRequestId = undefined;
        state.priceSuccess = true;
        state.priceData = [];
        state.priceData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumPrice.rejected, (state, action) => {
      if (
        state.priceLoading === true &&
        state.priceRequestId === action.meta.requestId
      ) {
        state.priceLoading = false;
        state.priceRequestId = undefined;
        state.priceSuccess = false;
        state.priceError = action.payload;
      }
    });

    //response ຂອງການ fetch ຍິງ request ໃນການສະແດງຂໍ້ມູນສະໜາມ

    builder.addCase(fetchGetStadiumsToAddPrice.pending, (state, action) => {
      state.priceLoading = true;
      if (state.priceLoading === true) {
        state.getStadiumsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumsToAddPrice.fulfilled, (state, action) => {
      if (
        state.priceLoading === true &&
        state.getStadiumsRequestId === action.meta.requestId
      ) {
        state.priceLoading = false;
        state.getStadiumsRequestId = undefined;
        state.getStadiumsSuccess = true;
        state.getStadiumsData = [];
        state.getStadiumsData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumsToAddPrice.rejected, (state, action) => {
      if (
        state.priceLoading === true &&
        state.getStadiumsRequestId === action.meta.requestId
      ) {
        state.priceLoading = false;
        state.getStadiumsRequestId = undefined;
        state.getStadiumsSuccess = false;
        state.priceError = action.payload;
      }
    });

    //response ຂອງການ fetch ຍິງ request ໃນການສະແດງຂໍ້ມູນຕາຕະລາງເວລາ
    builder.addCase(fetchGetTimesToAddPrice.pending, (state, action) => {
      state.getTimeLoading = true;
      if (state.getTimeLoading === true) {
        state.getTimesRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetTimesToAddPrice.fulfilled, (state, action) => {
      if (
        state.getTimeLoading === true &&
        state.getTimesRequestId === action.meta.requestId
      ) {
        state.getTimeLoading = false;
        state.getTimesRequestId = undefined;
        state.getTimesSuccess = true;
        state.getTimesData = [];
        state.getTimesData = action.payload;
      }
    });
    builder.addCase(fetchGetTimesToAddPrice.rejected, (state, action) => {
      if (
        state.getTimeLoading === true &&
        state.getTimesRequestId === action.meta.requestId
      ) {
        state.getTimeLoading = false;
        state.getTimesRequestId = undefined;
        state.getTimesSuccess = false;
        state.priceError = action.payload;
      }
    });

    //response ຂອງການ fetch ຍິງ request ໃນການເພີ່ມຂໍ້ມູນລາຄາສະໜາມ

    builder.addCase(fetchAddStadiumPrice.pending, (state, action) => {
      state.priceLoading = true;
    });
    builder.addCase(fetchAddStadiumPrice.fulfilled, (state, action) => {
      state.priceLoading = false;
      state.priceSuccess = true;
      state.priceData = [];
      state.priceData = action.payload;
    });
    builder.addCase(fetchAddStadiumPrice.rejected, (state, action) => {
      state.priceLoading = false;
      state.priceAddError = action.payload;
    });

    //response ຂອງການ fetch ຍິງ request ໃນການລຶບຂໍ້ມູນລາຄາສະໜາມ

    builder.addCase(fetchDeleteStadiumPrice.pending, (state, action) => {
      state.priceLoading = true;
    });
    builder.addCase(fetchDeleteStadiumPrice.fulfilled, (state, action) => {
      state.priceLoading = false;
      state.priceSuccess = true;
      state.priceError = null;
    });
    builder.addCase(fetchDeleteStadiumPrice.rejected, (state, action) => {
      state.priceLoading = false;
      state.priceError = action.payload;
    });
  },
});

export const { onDeleteStadiumPrice } = stadiumPriceSlice.actions;
export default stadiumPriceSlice.reducer;
