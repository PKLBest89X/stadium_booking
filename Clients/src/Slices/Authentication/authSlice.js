import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../Components/history";
import {
  fetchLoginUser,
  fetchAuthUser,
} from "../../middlewares/fetchAuth/fetchUser";
import {
  fetchLoginAdmin,
  fetchAuthAdmin,
} from "../../middlewares/fetchAuth/fetchStadiumUsers";
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
    userNow: (state, action) => {
      state.user = action.payload
    },
    userLogOut: (state, action) => {
      state.data = [];
      localStorage.removeItem("accessUserToken");
    },
    adminLogOut: (state, action) => {
      state.data = [];
      localStorage.removeItem("accessAdminToken");
      history.push('/');
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    //ເປັນ process ຂອງຝັ່ງລູກຄ້າໃນການ set state ຫຼັງຈາກ ຮັບ response
    builder.addCase(fetchLoginUser.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("accessUserToken", JSON.stringify(action.payload));
      history.push("/");
      window.location.reload();
    })
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(fetchAuthUser.pending, (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    })
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    })
    builder.addCase(fetchAuthUser.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    })
    //ເປັນ process ຂອງຝັ່ງເຈົ້າຂອງເດີ່ນໃນການ set state ຫຼັງຈາກ ຮັບ response
    builder.addCase(fetchLoginAdmin.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchLoginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("accessAdminToken", JSON.stringify(action.payload));
      history.push("/admin/stadium/create");
      window.location.reload();
    })
    builder.addCase(fetchLoginAdmin.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchAuthAdmin.pending, (state, action) => {
      state.loading = true;
      if (state.loading === true) {
        state.currentRequestId = action.meta.requestId;
      }
    })
    builder.addCase(fetchAuthAdmin.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.data.push(action.payload);
        state.currentRequestId = undefined;
      }
    })
    builder.addCase(fetchAuthAdmin.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.payload;
        state.currentRequestId = undefined;
      }
    })
  }
});

export const { userNow, userLogOut, adminLogOut } = authSlice.actions;
export default authSlice.reducer;
