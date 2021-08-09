import React, { useEffect } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { Box, Divider, Typography } from "@material-ui/core";

import { fetchGetAllBooking } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";
import { fetchGetAllBookingDetails } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";

import NotificationAlert from "../../../../Components/NotificationAlert";
import BookingListUnCheckout from "./BookingListUnCheckout";
import PaymentNavbarControl from "./PaymentNavbarControl";

const OverviewByBooking = React.memo(({ ...rest }) => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const { getAllBookingDetailsData } = useShallowEqualSelector(
    (state) => state.prePayment
  );

  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetAllBookingDetails(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    dispatch(fetchGetAllBooking(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);


  let alertSuccessPayment = null;
  if (notiName === "successPayment" && notiState === true) {
    alertSuccessPayment = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ການຊຳລະເງິນຂອງທ່ານສຳເລັດແລ້ວ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {alertSuccessPayment}
      <PageLayout title="Stadium Payment" {...rest}>
        <PaymentNavbarControl />
        <Box padding="1rem">
          <Typography variant="h3" color="textSecondary">
            ການຈອງຂອງລູກຄ້າ
          </Typography>
        </Box>
        <Divider />
        <Box padding="1rem" display="flex" justifyContent="center">
          <BookingListUnCheckout bookingBillData={getAllBookingDetailsData} />
        </Box>
      </PageLayout>
    </>
  );
});

export default OverviewByBooking;
