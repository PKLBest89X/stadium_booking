import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../Components/history";
import {
  fetchLoginUser,
  fetchAuthUser,
} from "../../middlewares/fetchAuth/fetchUser";
import { fetchLoginAdmin, fetchAuthAdmin } from '../../middlewares/fetchAuth/fetchStadiumUsers'
const initialState = {
  loading: false,
  data: [],
  currentRequestId: undefined,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {

    //ເປັນ process ຂອງຝັ່ງລູກຄ້າໃນການ set state ຫຼັງຈາກ ຮັບ response
    [fetchLoginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      localStorage.setItem("accessUserToken", JSON.stringify(action.payload));
      history.push("/");
      window.location.reload();
    },
    [fetchLoginUser.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [fetchAuthUser.pending]: (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    },
    [fetchAuthUser.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    },

    //ເປັນ process ຂອງຝັ່ງເຈົ້າຂອງເດີ່ນໃນການ set state ຫຼັງຈາກ ຮັບ response
    [fetchLoginAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLoginAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      localStorage.setItem("accessUserToken", JSON.stringify(action.payload));
      history.push("/");
      window.location.reload();
    },
    [fetchLoginAdmin.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [fetchAuthAdmin.pending]: (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchAuthAdmin.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    },
    [fetchAuthAdmin.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    },
  },
});

export default authSlice.reducer;
