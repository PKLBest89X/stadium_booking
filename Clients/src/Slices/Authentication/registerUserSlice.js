import { createSlice } from "@reduxjs/toolkit";
import { fetchRegisterUser } from "../../middlewares/fetchAuth/fetchRegisterUser";
import { history } from "../../Components/history";

const initialState = {
  loading: false,
  error: "",
};

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      history.push("/login");
      window.location.reload();
    });
    builder.addCase(fetchRegisterUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRegisterUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default registerUserSlice.reducer;
