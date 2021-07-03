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
  drinkError: null,
  drinkSuccess: null,
  drinkRequestId: undefined,
  drinkAddError: "",
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
    });
    builder.addCase(fetchUpdateStadiumDrink.rejected, (state, action) => {
      state.drinkLoading = false;
      state.drinkEditError = action.payload;
    });
  },
});

export const { onUpdateStadiumDrink, onClearError } = stadiumDrinkSlice.actions;
export default stadiumDrinkSlice.reducer;
