import React, { useCallback, useEffect, useState } from "react";
import { Box, Divider, TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { fetchUpdatePassword } from "../../../../middlewares/fetchAuth/fetchUser";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  onMessageClose,
  onMessageOpen,
  onNotiOpen,
} from "../../../../Slices/Features/Notification/NotificationSlice";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: "red",
  },
}));

const UpdatePassword = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { updatePasswordError } = useShallowEqualSelector(
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
    if (updatePasswordError) {
      return dispatch(onMessageOpen("wrongPassword"));
    }
    try {
      const updateRequest = await dispatch(fetchUpdatePassword(updatePassword));
      const getResult = unwrapResult(updateRequest);
      if (getResult) {
        dispatch(onPopupClose());
        dispatch(onNotiOpen("successUpdatePassword"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  let alertPassword = null;
  if (messageAlert === "wrongPassword" && messageState === true) {
    alertPassword = (
      <Box display="flex" alignItems="center">
        <Typography
          className={classes.textColor}
          variant="h5"
          color="secondary"
        >
          {updatePasswordError}
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
          {alertPassword}
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
