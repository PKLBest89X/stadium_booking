import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../Components/history";
import {
  fetchLoginSuperAdmin,
  fetchAuthSuperAdmin,
  fetchUpdateUserProfileSuperAdmin,
  fetchUpdatePasswordSuperAdmin
} from "../../middlewares/fetchAuth";
const initialState = {
  loading: false,
  user: null,
  data: [],
  currentRequestId: undefined,
  error: "",
  profileLoading: false,
  profileError: null,
  updatePasswordLoading: false,
  updatePasswordError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    superAdminLogOut: (state, action) => {
      state.data = [];
      localStorage.removeItem("accessSuperAdminToken");
      history.push("/login");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    //ເປັນ process ຂອງຝັ່ງລູກຄ້າໃນການ set state ຫຼັງຈາກ ຮັບ response
    builder.addCase(fetchLoginSuperAdmin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchLoginSuperAdmin.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem(
        "accessSuperAdminToken",
        JSON.stringify(action.payload)
      );
      history.push("/");
      window.location.reload();
    });
    builder.addCase(fetchLoginSuperAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAuthSuperAdmin.pending, (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchAuthSuperAdmin.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data = [];
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(fetchAuthSuperAdmin.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    });

    ///////////////ແກ້ໄຂ profile 

    builder.addCase(fetchUpdateUserProfileSuperAdmin.pending, (state, action) => {
      state.profileLoading = true;
    });
    builder.addCase(fetchUpdateUserProfileSuperAdmin.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.data = [];
      state.data.push(action.payload);
    });
    builder.addCase(fetchUpdateUserProfileSuperAdmin.rejected, (state, action) => {
      state.profileLoading = false;
      state.profileError = action.payload;
    });

    /////////////////ແກ້ໄຂລະຫັດຜ່ານ

    builder.addCase(fetchUpdatePasswordSuperAdmin.pending, (state, action) => {
      state.updatePasswordLoading = true;
    });
    builder.addCase(fetchUpdatePasswordSuperAdmin.fulfilled, (state, action) => {
      state.updatePasswordLoading = false;
    });
    builder.addCase(fetchUpdatePasswordSuperAdmin.rejected, (state, action) => {
      state.updatePasswordLoading = false;
      state.updatePasswordError = action.payload;
    });

  },
});

export const { superAdminLogOut } = authSlice.actions;
export default authSlice.reducer;
