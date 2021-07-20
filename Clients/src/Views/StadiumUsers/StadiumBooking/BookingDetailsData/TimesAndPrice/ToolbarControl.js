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
import { onClearSelectNonAccount } from "../../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
import { fetchGetBookingDetailsUnCheckoutNonAccount } from "../../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import { onFilterAvailableTimesNonAccount } from "../../../../../Slices/Features/StadiumUsers/BookingForNoAccount/getTimeNonAccountSlice";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";

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
  const { stadiumId_Admin } = useParams();
  const { stadiumsSelectedNonAccount, filterByDateDataNonAccount } =
    useShallowEqualSelector((state) => state.getTimesNonAccount);
  const { numSelected } = props;

  const filterByDate = useCallback(
    async (date, stadium) => {
      try {
        const fetchUnBooking = await dispatch(
          fetchGetBookingDetailsUnCheckoutNonAccount(stadiumId_Admin)
        );
        const getData = unwrapResult(fetchUnBooking);
        const filterRequest = {
          dateData: moment(date).format("YYYY-MM-DD"),
          stadiumId: stadium,
          unBookingData: getData,
        };
        dispatch(onFilterAvailableTimesNonAccount(filterRequest));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, stadiumId_Admin]
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
          ເລືອກໄລຍະເວລາເຕະ
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(onClearSelectNonAccount())}
          >
            <Cancel />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Refresh">
          <IconButton
            aria-label="filter list"
            onClick={() =>
              filterByDate(
                filterByDateDataNonAccount,
                stadiumsSelectedNonAccount
              )
            }
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
