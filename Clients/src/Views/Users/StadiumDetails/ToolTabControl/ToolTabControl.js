import React, { useCallback, useMemo, useRef } from "react";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { Box, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

import { fetchAddBooking } from "../../../../middlewares/user/fetchBooking/fetchBooking";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down("xs")]: {},
  },
}));

const ToolTabControl = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tabName, tabOpen } = useShallowEqualSelector((state) => state.popup);
  const { bookingData } = useShallowEqualSelector((state) => state.booking);
  const stateRef = useRef(bookingData);
  let history = useHistory();
  const { stadiumId } = useParams();
  const { url } = useRouteMatch();

  useMemo(
    () => bookingData.forEach((items) => (stateRef.current = items)),
    [bookingData]
  );

  const onGetCurrentBooking = useCallback(async () => {
    try {
      const customerToken = JSON.parse(localStorage.getItem("accessUserToken"));
      if (customerToken && customerToken.token) {
        await dispatch(fetchAddBooking(customerToken.token));
        history.push(`${url}/stadium-booking/${stateRef.current.b_id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, history, url]);

  const TabBackToOverViewBooking = () => (
    <Box marginRight="1rem">
      <IconButton color="primary" onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );

  const ToolTabControlForBooking = () => (
    <Box marginRight="1rem">
      <Button
        startIcon={<AddToPhotosIcon />}
        className={classes.button}
        onClick={onGetCurrentBooking}
        color="primary"
        variant="contained"
      >
        ຈອງ
      </Button>
    </Box>
  );

  return (
    <>
      {tabName === "tabForBooking" && tabOpen === true && (
        <ToolTabControlForBooking />
      )}
      {tabName === "tabBackToOverviewBooking" && tabOpen === true && (
        <TabBackToOverViewBooking />
      )}
    </>
  );
});

export default ToolTabControl;
