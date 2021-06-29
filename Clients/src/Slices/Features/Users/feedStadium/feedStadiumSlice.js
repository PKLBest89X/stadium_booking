import { createSlice } from "@reduxjs/toolkit";
import { fetchGetStadiumForUser } from '../../../../middlewares/user/fetchStadium/fetchStadium'

const initialState = {
    feedStadiumLoading: false,
    feedStadiumSuccess: null,
    feedStadiumData: [],
    feedStadiumError: null,
    feedStadiumRequestId: null,
};

const feedStadiumSlice = createSlice({
    name: 'feedStadium',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetStadiumForUser.pending, (state, { meta }) => {
            state.feedStadiumLoading = true;
            if (state.feedStadiumLoading === true) {
              state.feedStadiumRequestId = meta.requestId;
            }
          });
          builder.addCase(fetchGetStadiumForUser.fulfilled, (state, action) => {
            const { requestId } = action.meta;
            if (
              state.feedStadiumLoading === true ||
              state.feedStadiumRequestId === requestId
            ) {
              state.feedStadiumLoading = false;
              state.feedStadiumSuccess = true;
              state.feedStadiumRequestId = undefined;
              state.feedStadiumData = [];
              state.feedStadiumData = action.payload;
            }
          });
          builder.addCase(fetchGetStadiumForUser.rejected, (state, action) => {
            const { requestId } = action.meta;
            if (
              state.feedStadiumLoading === true ||
              state.feedStadiumRequestId === requestId
            ) {
              state.feedStadiumLoading = false;
              state.feedStadiumSuccess = false;
              state.feedStadiumRequestId = undefined;
              state.feedStadiumError = action.payload;
            }
          });
    }
});

export default feedStadiumSlice.reducer;