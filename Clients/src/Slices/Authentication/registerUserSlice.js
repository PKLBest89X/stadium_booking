import { createSlice } from "@reduxjs/toolkit";
import { fetchRegisterUser } from "../../middlewares/fetchAuth/fetchRegisterUser";
import { history } from '../../Components/history';

const initialState = {
  loading: false,
  error: '',
};

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {},
  extraReducers: {
      [fetchRegisterUser.fulfilled]: (state, action) => {
          state.loading = false;
          state.error = '';
          history.push('/login');
          window.location.reload();
      },
      [fetchRegisterUser.pending]: (state, action) => {
          state.loading = true;
      },
      [fetchRegisterUser.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload;
      }
  },
});

export default registerUserSlice.reducer;
