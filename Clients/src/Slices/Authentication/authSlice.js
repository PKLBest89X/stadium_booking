import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../Components/history";
import {
  fetchLoginUser,
  fetchAuthUser,
  fetchUpdateUserProfile,
  fetchUpdatePassword,
} from "../../middlewares/fetchAuth/fetchUser";
import {
  fetchLoginAdmin,
  fetchAuthAdmin,
  fetchUpdateUserProfileAdmin,
  fetchUpdatePasswordAdmin,
} from "../../middlewares/fetchAuth/fetchStadiumUsers";
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
  profileAdminLoading: false,
  profileAdminError: null,
  updatePasswordAdminLoading: false,
  updatePasswordAdminError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userNow: (state, action) => {
      state.user = action.payload;
    },
    userLogOut: (state, action) => {
      state.data = [];
      localStorage.removeItem("accessUserToken");
    },
    adminLogOut: (state, action) => {
      state.data = [];
      localStorage.removeItem("accessAdminToken");
      history.push("/");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    //ເປັນ process ຂອງຝັ່ງລູກຄ້າໃນການ set state ຫຼັງຈາກ ຮັບ response
    builder.addCase(fetchLoginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("accessUserToken", JSON.stringify(action.payload));
      history.push("/");
      window.location.reload();
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAuthUser.pending, (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data = [];
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(fetchAuthUser.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    });
    //ເປັນ process ຂອງຝັ່ງເຈົ້າຂອງເດີ່ນໃນການ set state ຫຼັງຈາກ ຮັບ response
    builder.addCase(fetchLoginAdmin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchLoginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("accessAdminToken", JSON.stringify(action.payload));
      history.push("/admin/stadium/create");
      window.location.reload();
    });
    builder.addCase(fetchLoginAdmin.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchAuthAdmin.pending, (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchAuthAdmin.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data = [];
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    });
    builder.addCase(fetchAuthAdmin.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    });

    ///////////////ແກ້ໄຂ profile user

    builder.addCase(
      fetchUpdateUserProfile.pending,
      (state, action) => {
        state.profileLoading = true;
      }
    );
    builder.addCase(
      fetchUpdateUserProfile.fulfilled,
      (state, action) => {
        state.profileLoading = false;
        state.data = [];
        state.data.push(action.payload);
      }
    );
    builder.addCase(
      fetchUpdateUserProfile.rejected,
      (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      }
    );

    /////////////////ແກ້ໄຂລະຫັດຜ່ານ user

    builder.addCase(fetchUpdatePassword.pending, (state, action) => {
      state.updatePasswordLoading = true;
    });
    builder.addCase(
      fetchUpdatePassword.fulfilled,
      (state, action) => {
        state.updatePasswordLoading = false;
      }
    );
    builder.addCase(fetchUpdatePassword.rejected, (state, action) => {
      state.updatePasswordLoading = false;
      state.updatePasswordError = action.payload;
    });

    ///////////////ແກ້ໄຂ admin

    builder.addCase(
      fetchUpdateUserProfileAdmin.pending,
      (state, action) => {
        state.profileAdminLoading = true;
      }
    );
    builder.addCase(
      fetchUpdateUserProfileAdmin.fulfilled,
      (state, action) => {
        state.profileAdminLoading = false;
        state.data = [];
        state.data.push(action.payload);
      }
    );
    builder.addCase(
      fetchUpdateUserProfileAdmin.rejected,
      (state, action) => {
        state.profileAdminLoading = false;
        state.profileAdminError = action.payload;
      }
    );

    /////////////////ແກ້ໄຂລະຫັດຜ່ານ admin

    builder.addCase(fetchUpdatePasswordAdmin.pending, (state, action) => {
      state.updatePasswordAdminLoading = true;
    });
    builder.addCase(
      fetchUpdatePasswordAdmin.fulfilled,
      (state, action) => {
        state.updatePasswordAdminLoading = false;
      }
    );
    builder.addCase(fetchUpdatePasswordAdmin.rejected, (state, action) => {
      state.updatePasswordAdminLoading = false;
      state.updatePasswordAdminError = action.payload;
    });
  },
});

export const { userNow, userLogOut, adminLogOut } = authSlice.actions;
export default authSlice.reducer;
