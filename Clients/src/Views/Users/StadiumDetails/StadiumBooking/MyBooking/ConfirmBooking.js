import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  fetchAddBookingFields,
  fetchConfirmBooking,
} from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  onNotiOpen,
  onMessageOpen,
  onMessageClose,
} from "../../../../../Slices/Features/Notification/NotificationSlice";

import { onPopupClose } from "../../../../../Slices/Features/Popup/popupSlice";
import { fetchGetCurrentBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";

const useStyles = makeStyles(() => ({
  text: {
    color: "red",
  },
}));

const ConfirmBooking = React.memo(() => {
  const classes = useStyles();
  const { stadiumId, bookingId } = useParams();
  const { messageAlert, messageState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const { bookingDetailsData } = useShallowEqualSelector(
    (state) => state.bookingDetails
  );

  const { feedStadiumData } = useShallowEqualSelector(
    (state) => state.feedStadium
  );
  const stateRef = useRef(feedStadiumData);

  const dispatch = useDispatch();
  const [confirmCheckBox, setConfirmCheckBox] = useState(false);

  useMemo(
    () => feedStadiumData.forEach((items) => (stateRef.current = items)),
    [feedStadiumData]
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
        return dispatch(onMessageOpen("unCheckPermission"));
      try {
        const addBookingDetails = await dispatch(
          fetchAddBookingFields(bookingDetailsData)
        );
        const getResponse1 = unwrapResult(addBookingDetails);
        if (getResponse1.status !== 400) {
          const requestData = {
            stadiumId,
            bookingId,
          };
          const confirmBooking = await dispatch(
            fetchConfirmBooking(requestData)
          );
          const getResponse2 = unwrapResult(confirmBooking);
          if (getResponse2.status !== 400) {
            dispatch(onPopupClose());
            dispatch(onNotiOpen("successBooking"));
            const customerToken = JSON.parse(
              localStorage.getItem("accessUserToken")
            );
            if (customerToken && customerToken.token) {
              const requestCurrentBooking = {
                bookingId,
                token: customerToken.token,
              };
              dispatch(fetchGetCurrentBooking(requestCurrentBooking));
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, confirmCheckBox, bookingDetailsData, stadiumId, bookingId]
  );

  let alertPermission = null;
  if (messageAlert === "unCheckPermission" && messageState === true) {
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
              {`ເມື່ອທ່ານດຳເນີນການຈອງເດີ່ນນີ່ແລ້ວ, ລະບົບຈະດຳເນີນການກວດສອບການຈອງປັດຈຸບັນຂອງທ່ານ ແລະ ທ່ານຈະບໍ່ສາມາດຈອງເດີ່ນໄດ້ອີກຊົ່ວຄາວ, ຈົນກວ່າທ່ານຈະດຳເນີນການຊຳລະຄ່າເດີ່ນສຳເລັດແລ້ວ. ດັ່ງນັ້ນ, ຖ້າທ່ານຢາກຍົກເລີກການຈອງເດີ່ນດັ່ງກ່າວ ທ່ານສາມາດຍົກເລີກການຈອງໄດ້ພາຍໃນ ${stateRef.current.time_cancelbooking} ຊົ່ວໂມງ ຕາມທີ່ທາງເດີ່ນໄດ້ກຳນົດໄວ້.`}
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
