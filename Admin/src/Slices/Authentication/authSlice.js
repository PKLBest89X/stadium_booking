import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../Components/history";
import { fetchLoginSuperAdmin, fetchAuthSuperAdmin } from "../../middlewares/fetchAuth";
const initialState = {
  loading: false,
  user: null,
  data: [],
  currentRequestId: undefined,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    superAdminLogOut: (state, action) => {
      state.data = [];
      localStorage.removeItem("accessSuperAdminToken");
      history.push('/login');
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    //ເປັນ process ຂອງຝັ່ງລູກຄ້າໃນການ set state ຫຼັງຈາກ ຮັບ response
    builder.addCase(fetchLoginSuperAdmin.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchLoginSuperAdmin.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("accessSuperAdminToken", JSON.stringify(action.payload));
      history.push("/");
      window.location.reload();
    })
    builder.addCase(fetchLoginSuperAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(fetchAuthSuperAdmin.pending, (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    })
    builder.addCase(fetchAuthSuperAdmin.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data = [];
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    })
    builder.addCase(fetchAuthSuperAdmin.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    })
  }
});

export const { superAdminLogOut } = authSlice.actions;
export default authSlice.reducer;
