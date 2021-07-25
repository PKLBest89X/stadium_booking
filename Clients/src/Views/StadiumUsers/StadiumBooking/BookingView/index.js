import React, { useEffect, useRef } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckBooking } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core";

import { onLoadCurrentSaveSelectedDataNonAccount } from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";

import BookingTable from "./BookingTable";
import BookingToolbar from "./BookingToolbar";
import UserNonAccount from "./UserNonAccount";
import TotalBookingPrice from "./TotalBookingPrice";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
  },
}));

const BookingView = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );
  const { stadiumId_Admin, bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const userNonAccountRef = useRef();
  const totalBookingPriceRef = useRef();

  const {
    selectedStateNonAccount,
    bookingDetailsNonAccountData,
    bookingDetailsSelectedNonAccount,
  } = useShallowEqualSelector((state) => state.bookingDetailsNonAccount);

  useEffect(
    () => dispatch(onLoadCurrentSaveSelectedDataNonAccount()),
    [dispatch]
  );

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເລກບິນການຈອງເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (checkBookingResult === 404) {
      history.replace("/404");
    }
  }, [history, checkBookingResult]);

  const ShowEmptyBooking = () => (
    <div className={classes.emptyView}>
      <Typography variant="h4" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລການຈອງເດີ່ນຂອງທ່ານ
      </Typography>
    </div>
  );

  const onConfirmBooking = (event) => {
    event.preventDefault();
  }

  return (
    <PageLayout title="Booking Form" {...rest}>
      <div className={classes.pageContainer}>
        <div className={classes.root}>
          <form onSubmit={onConfirmBooking}>
            <Paper className={classes.paper}>
              <UserNonAccount ref={userNonAccountRef} />
            </Paper>
            <Paper className={classes.paper}>
              <BookingToolbar
                numSelected={bookingDetailsSelectedNonAccount.length}
                dataForDelete={bookingDetailsSelectedNonAccount}
              />
              <Divider />
              {selectedStateNonAccount === true && (
                <BookingTable bookingDetails={bookingDetailsNonAccountData} />
              )}
              {selectedStateNonAccount === false && <ShowEmptyBooking />}
            </Paper>
            <Paper className={classes.paper}>
              <TotalBookingPrice ref={totalBookingPriceRef} />
            </Paper>
          </form>
        </div>
      </div>
    </PageLayout>
  );
});
export default BookingView;
