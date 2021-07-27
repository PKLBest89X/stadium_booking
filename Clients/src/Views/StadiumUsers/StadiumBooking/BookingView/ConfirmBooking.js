import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  fetchAddBookingFieldsNonAccount,
  fetchAddUserNonAccount,
  fetchConfirmBookingNonAccount,
} from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  onNotiOpen,
  onMessageOpen,
  onMessageClose,
} from "../../../../Slices/Features/Notification/NotificationSlice";

import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  text: {
    color: "red",
  },
}));

const ConfirmBooking = React.memo(({ userNonAccount }) => {
  const classes = useStyles();
  let history = useHistory();
  const { stadiumId_Admin, bookingId } = useParams();
  const { messageAlert, messageState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const { bookingDetailsNonAccountData } = useShallowEqualSelector(
    (state) => state.bookingDetailsNonAccount
  );

  const { stadiumData } = useShallowEqualSelector((state) => state.stadium);
  const stateRef = useRef(stadiumData);

  const dispatch = useDispatch();
  const [confirmCheckBox, setConfirmCheckBox] = useState(false);

  useMemo(
    () => stadiumData.forEach((items) => (stateRef.current = items)),
    [stadiumData]
  );

  useEffect(() => {
    return () => dispatch(onMessageClose());
  }, [dispatch]);

  const handleChange = () => {
    setConfirmCheckBox(!confirmCheckBox);
    dispatch(onMessageClose());
  };

  const comfirmBooking = useCallback(
    async (event) => {
      event.preventDefault();
      if (confirmCheckBox === false)
        return dispatch(onMessageOpen("unCheckPermissionNonAccount"));
      try {
        const addUserNonAccount = await dispatch(
          fetchAddUserNonAccount(userNonAccount)
        );
        const getResponse = unwrapResult(addUserNonAccount);
        if (getResponse.status !== 400) {
          const addBookingDetails = await dispatch(
            fetchAddBookingFieldsNonAccount(bookingDetailsNonAccountData)
          );
          const getResponse1 = unwrapResult(addBookingDetails);
          if (getResponse1.status !== 400) {
            const requestData = {
              stadiumId: stadiumId_Admin,
              bookingId,
            };
            const confirmBooking = await dispatch(
              fetchConfirmBookingNonAccount(requestData)
            );
            const getResponse2 = unwrapResult(confirmBooking);
            if (getResponse2.status !== 400) {
              await dispatch(onPopupClose());
              await history.push(`/admin/stadium/${stadiumId_Admin}/stadium-booking`);
              dispatch(onNotiOpen("successBookingNonAccount"));
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [
      dispatch,
      confirmCheckBox,
      bookingDetailsNonAccountData,
      stadiumId_Admin,
      history,
      userNonAccount,
      bookingId,
    ]
  );

  let alertPermission = null;
  if (messageAlert === "unCheckPermissionNonAccount" && messageState === true) {
    alertPermission = (
      <Box display="flex" alignItems="center">
        <Typography className={classes.text} variant="h5" color="secondary">
        ທ່ານຕ້ອງຍອມຮັບເງືີ່ອນໄຂກ່ອນຢືນຢັນ!
        </Typography>
      </Box>
    );
  }

  return (
    <Box height="100%">
      <form onSubmit={comfirmBooking}>
        <Paper>
          <Box padding="1rem">
            <Typography variant="h4">ຂໍ້ກຳນົດ ແລະ ເງື່ອນໄຂ</Typography>
          </Box>
          <Divider />
          <Box padding="1rem">
            <Typography variant="h5" color="textSecondary">
              {`ເມື່ອທ່ານດຳເນີນການຈອງເດີ່ນນີ່ແລ້ວ, ຖ້າທ່ານຢາກຍົກເລີກການຈອງເດີ່ນດັ່ງກ່າວ ທ່ານສາມາດຍົກເລີກການຈອງໄດ້ພາຍໃນ ${stateRef.current.time_cancelbooking} ຊົ່ວໂມງ ຕາມທີ່ທາງເດີ່ນໄດ້ກຳນົດໄວ້. ຂໍໃຫ້ທ່ານໂຊກດີ 555.`}
            </Typography>
          </Box>
        </Paper>
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmCheckBox}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label={
            <Typography variant="h5" color="textSecondary">
              ຍອມຮັບ ແລະ ເຂົ້າໃຈເງື່ອນໄຂດັ່ງກ່າວ
            </Typography>
          }
        />
        {alertPermission}
        <Box
          display="flex"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button type="submit" color="primary" variant="contained">
            ຢືນຢັນ
          </Button>
        </Box>
      </form>
    </Box>
  );
});

export default ConfirmBooking;
