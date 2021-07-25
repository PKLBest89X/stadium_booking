import React, { useEffect, useRef } from "react";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { Typography, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { onLoadCurrentSaveSelectedData } from "../../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";

import BookingTable from "./BookingTable";
import BookingToolbar from "./BookingToolbar";
import TotalBookingPrice from "./TotalBookingPrice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
  },
}));

const PreBooking = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalBookingPriceRef = useRef();
  const { selectedState, bookingDetailsData, bookingDetailsSelected } =
    useShallowEqualSelector((state) => state.bookingDetails);

  useEffect(() => dispatch(onLoadCurrentSaveSelectedData()), [dispatch]);

  const ShowEmptyBooking = () => (
    <div className={classes.emptyView}>
      <Typography variant="h4" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລການຈອງເດີ່ນຂອງທ່ານ
      </Typography>
    </div>
  );

  const onConfirmBooking = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onConfirmBooking}>
        <Paper className={classes.paper}>
          <BookingToolbar numSelected={bookingDetailsSelected.length} dataForDelete={bookingDetailsSelected} />
          <Divider />
          {selectedState === true && (
            <BookingTable bookingDetails={bookingDetailsData} />
          )}
          {selectedState === false && <ShowEmptyBooking />}
        </Paper>
        <Paper className={classes.paper}>
          <TotalBookingPrice ref={totalBookingPriceRef} />
        </Paper>
      </form>
    </div>
  );
});

export default PreBooking;
