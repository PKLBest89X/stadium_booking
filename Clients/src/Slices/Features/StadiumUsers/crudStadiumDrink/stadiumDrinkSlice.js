import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetStadiumDrink,
  fetchAddStadiumDrink,
  fetchUpdateStadiumDrink,
} from "../../../../middlewares/stadiumUser/fetchCRUDStadiumDrink/fetchCRUDStadiumDrink";

const initialState = {
  drinkLoading: false,
  drinksData: [],
  drinksDataById: [],
  drinksDataSortByDate: [],
  drinkError: null,
  drinkSuccess: null,
  drinkRequestId: undefined,
  drinkAddError: null,
  drinkEditError: null,
};

const stadiumDrinkSlice = createSlice({
  name: "stadiumDrink",
  initialState,
  reducers: {
    onUpdateStadiumDrink: (state, { payload }) => {
      state.drinksDataById = [];
      state.drinksDataById.push(payload);
    },
    onClearError: (state) => {
      state.drinkAddError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadiumDrink.pending, (state, action) => {
      state.drinkLoading = true;
      if (state.drinkLoading === true) {
        state.drinkRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumDrink.fulfilled, (state, action) => {
      if (
        state.drinkLoading === true &&
        state.drinkRequestId === action.meta.requestId
      ) {
        state.drinkLoading = false;
        state.drinkRequestId = undefined;
        state.drinkSuccess = true;
        state.drinksData = [];
        state.drinksData = action.payload;
        let slicePayload = action.payload.slice(0, 6);
        let newSort = slicePayload.sort(
          (a, b) => (new Date(a["stw_date"]) - new Date(b["stw_date"])) * -1
        );
        state.drinksDataSortByDate = newSort;
      }
    });
    builder.addCase(fetchGetStadiumDrink.rejected, (state, action) => {
      if (
        state.drinkLoading === true &&
        state.drinkRequestId === action.meta.requestId
      ) {
        state.drinkLoading = false;
        state.drinkRequestId = undefined;
        state.drinkSuccess = false;
        state.drinkError = action.payload;
      }
    });

    builder.addCase(fetchAddStadiumDrink.pending, (state, action) => {
      state.drinkLoading = true;
    });
    builder.addCase(fetchAddStadiumDrink.fulfilled, (state, action) => {
      state.drinkLoading = false;
      state.drinkSuccess = true;
      state.drinksData = [];
      state.drinksData = action.payload;
      state.drinksDataSortByDate = [];
      let slicePayload = action.payload.slice(0, 6);
      let newSort = slicePayload.sort(
        (a, b) => (new Date(a["stw_date"]) - new Date(b["stw_date"])) * -1
      );
      state.drinksDataSortByDate = newSort;
    });
    builder.addCase(fetchAddStadiumDrink.rejected, (state, action) => {
      state.drinkLoading = false;
      state.drinkAddError = action.payload;
    });
    builder.addCase(fetchUpdateStadiumDrink.pending, (state, action) => {
      state.drinkLoading = true;
    });
    builder.addCase(fetchUpdateStadiumDrink.fulfilled, (state, action) => {
      state.drinkLoading = false;
      state.drinkSuccess = true;
      state.drinksData = [];
      state.drinksData = action.payload;
      state.drinksDataSortByDate = [];
      let slicePayload = action.payload.slice(0, 6);
      let newSort = slicePayload.sort(
        (a, b) => (new Date(a["stw_date"]) - new Date(b["stw_date"])) * -1
      );
      state.drinksDataSortByDate = newSort;
    });
    builder.addCase(fetchUpdateStadiumDrink.rejected, (state, action) => {
      state.drinkLoading = false;
      state.drinkEditError = action.payload;
    });
  },
});

export const { onUpdateStadiumDrink, onClearError } = stadiumDrinkSlice.actions;
export default stadiumDrinkSlice.reducer;
