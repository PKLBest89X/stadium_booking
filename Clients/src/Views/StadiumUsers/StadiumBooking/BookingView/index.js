import React, { useCallback, useEffect, useMemo, useRef } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckBooking } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const BookingView = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );
  const { stadiumId_Admin, bookingId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

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
      <Typography variant="h3" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລການຈອງເດີ່ນຂອງທ່ານ
      </Typography>
    </div>
  );

  return (
    <PageLayout title="Booking Form" {...rest}>
      <div className={classes.pageContainer}>
        <Button
          onClick={() => history.push(`${url}/manage`)}
          color="primary"
          variant="contained"
        >
          ເພີ່ມການຈອງ
        </Button>
        <ShowEmptyBooking />
      </div>
    </PageLayout>
  );
});
export default BookingView;
