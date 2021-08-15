import React, { useState, useMemo, useCallback, useRef } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker, DatePicker } from "@material-ui/pickers";
import {
  InputBase,
  Paper,
  IconButton,
  Box,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Book from "@material-ui/icons/Book";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import ListIcon from "@material-ui/icons/List";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { fetchAddBookingNonAccount } from "../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import NavigationLayout from "../../../Components/NavigationLayout";

import {
  onClearResultSearchAndSeletedDate,
  onFilterBookingHistoryByDate,
  onSearchAllBookingHistory,
} from "../../../Slices/Features/Users/bookingHistory/bookingHistorySlice";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const BookingNavbarControl = React.memo(() => {
  const classes = useStyles();
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [date, changeDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());

  const dispatch = useDispatch();
  const { stadiumId_Admin } = useParams();
  let history = useHistory();
  const { url } = useRouteMatch();
  const { bookingNonAccountData } = useShallowEqualSelector(
    (state) => state.bookingNonAccount
  );
  const stateRef = useRef(bookingNonAccountData);

  const { showByDateData, searchTyping } = useShallowEqualSelector(
    (state) => state.bookingHistory
  );

  useMemo(
    () => bookingNonAccountData.forEach((items) => (stateRef.current = items)),
    [bookingNonAccountData]
  );

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise((resolve) => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };

  const RoutesButton = (pathName) => {
    history.push(`/booking-history/${pathName}`);
    dispatch(onClearResultSearchAndSeletedDate());
  };

  return (
    <NavigationLayout>
      <Box mb={2}>
        <Paper
          component="form"
          className={classes.root}
          onSubmit={(event) => event.preventDefault()}
        >
          <InputBase
            className={classes.input}
            placeholder="ຄົ້ນຫາຕາມຊື່ເດີ່ນ..."
            inputProps={{ "aria-label": "search" }}
            value={searchTyping}
            onChange={(event) =>
              dispatch(onSearchAllBookingHistory(event.target.value))
            }
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Paper>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" color="textSecondary">
            ເລືອກຕາມວັນ
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            onClick={() =>
              dispatch(
                onFilterBookingHistoryByDate(
                  moment(Date.now()).format("YYYY-MM-DD")
                )
              )
            }
          >
            today
          </Button>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="center" alignItems="center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              variant="static"
              orientation="landscape"
              id="date-picker-dialog"
              label="ຄົ້ນຫາຕາມວັນ"
              disableToolbar={true}
              format="dd/MM/yyyy"
              openTo="date"
              value={showByDateData}
              onChange={(date) => {
                dispatch(
                  onFilterBookingHistoryByDate(
                    moment(date).format("YYYY-MM-DD")
                  )
                );
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Paper>
      <Paper>
        <Box mt={2} display="block">
          <Box padding="1rem" display="flex" alignItems="center">
            <Typography gutterBottom variant="h5" color="textPrimary">
              ປະເພດການຈັດການ
            </Typography>
          </Box>
          <Divider />
          <Box
            padding="1rem"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Button
              startIcon={<Book />}
              color="inherit"
              onClick={() => RoutesButton("")}
            >
              ການຈອງທັງໝົດຂອງຂ້ອຍ
            </Button>
            <Button
              startIcon={<CheckCircleIcon />}
              color="inherit"
              onClick={() => RoutesButton("available-canceling")}
            >
              ຍົກເລີກການຈອງ
            </Button>
            <Button
              startIcon={<PaymentIcon />}
              color="inherit"
              onClick={() => RoutesButton("allBooking-paid")}
            >
              ການຈອງທີ່ໄດ້ຊຳລະເງິນແລ້ວ
            </Button>
            <Button
              startIcon={<ListIcon />}
              color="inherit"
              onClick={() => RoutesButton("allBooking-unpaid")}
            >
              ການຈອງທີ່ຍັງບໍ່ໄດ້ຊຳລະຄ່າເດີ່ນ
            </Button>
          </Box>
        </Box>
      </Paper>
    </NavigationLayout>
  );
});

export default BookingNavbarControl;
