import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckBooking } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
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

const MyBooking = () => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );
  const { stadiumId, bookingId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId));
  }, [dispatch, stadiumId]);

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
    <ChildPageLayout title="Stadium Booking">
      <Button
        onClick={() => history.push(`${url}/manage`)}
        color="primary"
        variant="contained"
      >
        ເພີ່ມການຈອງ
      </Button>
      <ShowEmptyBooking />
    </ChildPageLayout>
  );
};
export default MyBooking;
