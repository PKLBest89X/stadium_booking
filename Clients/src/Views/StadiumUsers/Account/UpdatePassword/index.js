import React, { useCallback, useState, useEffect } from "react";
import { Box, Divider, TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { fetchUpdatePasswordAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  onNotiOpen,
  onMessageOpen,
  onMessageClose,
} from "../../../../Slices/Features/Notification/NotificationSlice";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: "red",
  },
}));

const UpdatePassword = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { updatePasswordAdminError } = useShallowEqualSelector(
    (state) => state.auth
  );
  const { messageAlert, messageState } = useShallowEqualSelector(
    (state) => state.notification
  );
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    return () => dispatch(onMessageClose());
  }, [dispatch]);

  const onPasswordOldChange = useCallback((event) => {
    const { name, value } = event.target;
    setUpdatePassword((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onPasswordNewChange = useCallback((event) => {
    const { name, value } = event.target;
    setUpdatePassword((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onUpdatePassword = async (event) => {
    event.preventDefault();
    if (updatePasswordAdminError) {
      return dispatch(onMessageOpen("wrongPasswordAdmin"))
    }
    try {
      const updateRequest = await dispatch(
        fetchUpdatePasswordAdmin(updatePassword)
      );
      const getResult = unwrapResult(updateRequest);
      if (getResult) {
        dispatch(onPopupClose());
        dispatch(onNotiOpen("successUpdatePasswordAdmin"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  let alertPasswordAdmin = null;
  if (messageAlert === "wrongPasswordAdmin" && messageState === true) {
    alertPasswordAdmin = (
      <Box display="flex" alignItems="center">
        <Typography
          className={classes.textColor}
          variant="h5"
          color="secondary"
        >
          {updatePasswordAdminError}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <form onSubmit={onUpdatePassword}>
        <Box>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ປ່ຽນລະຫັດຜ່ານ
            </Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <TextField
              fullWidth
              label="ລະຫັດເກົ່າ"
              margin="normal"
              name="oldPassword"
              type="password"
              variant="outlined"
              value={updatePassword.oldPassword}
              onChange={onPasswordOldChange}
              required
            />
            <TextField
              fullWidth
              label="ລະຫັດໃໝ່"
              margin="normal"
              name="newPassword"
              type="password"
              variant="outlined"
              value={updatePassword.newPassword}
              onChange={onPasswordNewChange}
              required
            />
          </Box>
          {alertPasswordAdmin}
          <Box
            mt={3}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button type="submit" variant="contained" color="primary">
              ປ່ຽນລະຫັດ
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
});

export default UpdatePassword;
