import React, { useCallback } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import Cancel from "@material-ui/icons/Cancel";
import Refresh from "@material-ui/icons/Refresh";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { useParams } from "react-router-dom";
import { onClearSelect } from "../../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";
import { fetchGetBookingDetailsUnCheckout } from "../../../../../../middlewares/user/fetchBooking/fetchBooking";
import { onFilterAvailableTimes } from "../../../../../../Slices/Features/Users/Booking/getTimeSlice";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const ToolbarControl = React.memo((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stadiumId } = useParams();
  const { stadiumsSelected, filterByDateData } = useShallowEqualSelector(
    (state) => state.getTimes
  );
  const { numSelected } = props;

  const filterByDate = useCallback(
    async (date, stadium) => {
      try {
        const fetchUnBooking = await dispatch(
          fetchGetBookingDetailsUnCheckout(stadiumId)
        );
        const getData = unwrapResult(fetchUnBooking);
        const filterRequest = {
          dateData: moment(date).format("YYYY-MM-DD"),
          stadiumId: stadium,
          unBookingData: getData,
        };
        dispatch(onFilterAvailableTimes(filterRequest));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, stadiumId]
  );

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} ລາຍການ
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h5"
          id="tableTitle"
          component="div"
          color="textSecondary"
        >
          ເວລາທີ່ຍັງວ່າງ
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(onClearSelect())}
          >
            <Cancel />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Refresh">
          <IconButton
            aria-label="filter list"
            onClick={() => filterByDate(filterByDateData, stadiumsSelected)}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
});

ToolbarControl.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default ToolbarControl;
