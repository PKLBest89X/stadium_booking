import React, { useEffect } from "react";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useRouteMatch } from "react-router-dom";

import { onLoadCurrentSaveSelectedData } from "../../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";

import BookingTable from "./BookingTable";

const useStyles = makeStyles(() => ({
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const PreBooking = React.memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { selectedState, bookingDetailsSelected } = useShallowEqualSelector(
    (state) => state.bookingDetails
  );

  useEffect(() => dispatch(onLoadCurrentSaveSelectedData()), [dispatch]);

  const ShowEmptyBooking = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລການຈອງເດີ່ນຂອງທ່ານ
      </Typography>
    </div>
  );
  return (
    <div>
      <Button
        onClick={() => history.push(`${url}/manage`)}
        color="primary"
        variant="contained"
      >
        ເພີ່ມການຈອງ
      </Button>

      {selectedState === true && (
        <BookingTable bookingDetails={bookingDetailsSelected} />
      )}
      {selectedState === false && <ShowEmptyBooking />}
    </div>
  );
});

export default PreBooking;
