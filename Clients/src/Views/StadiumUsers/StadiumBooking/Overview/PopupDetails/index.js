import React, { useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { useParams } from "react-router-dom";

import { fetchGetStadium } from "../../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import { unwrapResult } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import {
  onMessageClose,
  onMessageOpen,
  onNotiOpen,
} from "../../../../../Slices/Features/Notification/NotificationSlice";

import Header from "./Header";
import Information from "./Information";
import Details from "./Details";
import OtherDetails from "./OtherDetails";
import { onPopupClose } from "../../../../../Slices/Features/Popup/popupSlice";
import { fetchCancelBookingNonAccount } from "../../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchCancelBookingNonAccount";
import {
  onConfirmApprovingBooking,
  onCancelBookingNonAccount,
} from "../../../../../Slices/Features/StadiumUsers/BookingForNoAccount/preBookingNonAccountSlice";
import {
  fetchApproveBookingSubStatus,
  fetchConfirmApprovingBooking,
} from "../../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchApproveBooking";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  text: {
    color: "red",
  },
}));

const PopupDetails = React.memo(() => {
  const classes = useStyles();
  const { stadiumId_Admin } = useParams();

  const {
    showBookingDetails,
    showOtherBookingDetails,
    otherDetailsState,
    findPendingBooking,
    findPendingOtherBooking,
    information,
  } = useShallowEqualSelector((state) => state.preBookingNonAccount);

  const { messageAlert, messageState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  //ການເອົາຂໍ້ມູນເດີ່ນ
  useEffect(() => {
    dispatch(fetchGetStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    return () => dispatch(onMessageClose());
  }, [dispatch]);

  let alertCantCancel = null;
  if (messageAlert === "alertCantCancelBooking" && messageState === true) {
    alertCantCancel = (
      <Box display="flex" alignItems="center">
        <Typography className={classes.text} variant="h5" color="secondary">
          ກາຍເວລາຍົກເລີກແລ້ວ!!
        </Typography>
      </Box>
    );
  }

  const compareTime = (time) => {
    const newTime = new Date(time) - new Date();
    if (newTime < 0) {
      return -1;
    }
    return 1;
  };

  const fetchingUpdateBookingSubStatus = useCallback(
    async (
      array1,
      array2,
      otherDetailsState,
      findPendingOtherBooking,
      findPendingBooking
    ) => {
      try {
        let remainData = [];
        if (
          otherDetailsState === true &&
          findPendingOtherBooking === "pending" &&
          findPendingBooking === ""
        ) {
          remainData = array2;
        } else if (
          otherDetailsState === true &&
          findPendingOtherBooking === "" &&
          findPendingBooking === "pending"
        ) {
          remainData = array1;
        } else if (
          otherDetailsState === true &&
          findPendingOtherBooking === "pending" &&
          findPendingBooking === "pending"
        ) {
          remainData = remainData.concat(array1, array2);
        }
        if (remainData.length > 0) {
          const updateBookingSubStatus = await dispatch(
            fetchApproveBookingSubStatus(remainData)
          );
          const getResponse = unwrapResult(updateBookingSubStatus);
          return getResponse;
        }
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    [dispatch]
  );

  const fetchingUpdateBookingStatus = useCallback(
    async (data) => {
      try {
        const updateRequest = {
          stadiumId: stadiumId_Admin,
          requestData: data,
        };
        const updateBookingStatus = await dispatch(
          fetchConfirmApprovingBooking(updateRequest)
        );
        const getResponse = unwrapResult(updateBookingStatus);
        return getResponse;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    [dispatch, stadiumId_Admin]
  );

  const goBackAfterAcceptPayment = useCallback(async () => {
    dispatch(onPopupClose());
    dispatch(onNotiOpen("successApproveBooking"));
  }, [dispatch]);

  const confirmApproveBooking = async (payload) => {
    const getCompareResult = compareTime(payload.bookingCancel);
    if (getCompareResult === -1) return dispatch(onMessageOpen(""));
    if (getCompareResult === 1) {
      try {
        await fetchingUpdateBookingSubStatus(
          showBookingDetails,
          showOtherBookingDetails,
          otherDetailsState,
          findPendingOtherBooking,
          findPendingBooking
        );
        await fetchingUpdateBookingStatus(payload);
        goBackAfterAcceptPayment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cancel = async (payload) => {
    const getCompareResult = compareTime(payload.bookingCancel);
    if (getCompareResult === -1) {
      return dispatch(onMessageOpen("alertCantCancelBooking"));
    } else if (getCompareResult === 1) {
      try {
        await dispatch(fetchCancelBookingNonAccount(payload.bookingId));
        dispatch(onCancelBookingNonAccount(payload.bookingId));
        dispatch(onPopupClose());
        dispatch(onNotiOpen("successCancelBookingNonAccount"));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div>
        <Box padding="1rem">
          <Box display="block" justifyContent="center" alignItems="center">
            <Box>
              <Header profile={information} />
            </Box>
            <Box mt={3} mb={3}>
              <Information />
            </Box>
            <Box>
              <Paper>
                <Box padding="1rem">
                  <Typography variant="h4">ລາຍການຈອງເດີ່ນ</Typography>
                </Box>
                <Divider />
                <Box>
                  <Details data={showBookingDetails} />
                </Box>
              </Paper>
            </Box>
            {otherDetailsState === true && (
              <Box mt={3}>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">{`ອີກ ${showOtherBookingDetails.length} ລາຍການທີ່ຈອງຮ່ວມກັນ`}</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <OtherDetails data={showOtherBookingDetails} />
                  </Box>
                </Paper>
              </Box>
            )}
          </Box>
        </Box>
      </div>
      {alertCantCancel}
      <Box
        display="flex"
        width="100%"
        justifyContent="flex-end"
        alignItems="center"
      >
        {(findPendingBooking === "pending" ||
          findPendingOtherBooking === "pending") && (
          <Box mt={3} marginRight=".5rem">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => confirmApproveBooking(information)}
            >
              ອະນຸມັດການຈອງ
            </Button>
          </Box>
        )}

        <Box mt={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => cancel(information)}
          >
            ຍົກເລີກການຈອງ
          </Button>
        </Box>
      </Box>
    </>
  );
});

export default PopupDetails;
