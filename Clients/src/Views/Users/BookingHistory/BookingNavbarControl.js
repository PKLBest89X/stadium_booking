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
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PaymentIcon from '@material-ui/icons/Payment';

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { fetchAddBookingNonAccount } from "../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import NavigationLayout from "../../../Components/NavigationLayout";

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

  const onGetCurrentBooking = useCallback(async () => {
    try {
      const staffToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      if (staffToken && staffToken.token) {
        const addBookingRequest = await dispatch(
          fetchAddBookingNonAccount(staffToken.token)
        );
        const getResult = unwrapResult(addBookingRequest);
        if (getResult.status !== 400) {
          history.push(`${url}/${stateRef.current.b_id}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, history, url]);

  return (
    <NavigationLayout>
      <Box mb={2}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="ຄົ້ນຫາຕາມຊື່ເດີ່ນ, ມື້ຈອງ..."
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Paper>
        <Box padding="1rem">
          <Typography gutterBottom variant="h5" color="textSecondary">
            ເລືອກຕາມວັນ
          </Typography>
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
              format="MM/dd/yyyy"
              openTo="date"
              value={date}
              onChange={changeDate}
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
          <Box padding="1rem" display="flex" flexDirection="column" alignItems="flex-start">
            <Button
              startIcon={<Book />}
              color="inherit"
              onClick={onGetCurrentBooking}
            >
              ການຈອງທັງໝົດຂອງຂ້ອຍ
            </Button>
            <Button startIcon={<CheckCircleIcon />} color="inherit">
              ການຈອງທີ່ຍົກເລີກໄດ້
            </Button>
            <Button startIcon={<PaymentIcon />} color="inherit">
              ການຈອງທີ່ໄດ້ຊຳລະເງິນແລ້ວ
            </Button>
            <Button startIcon={<CancelIcon />} color="inherit">
              ການຈອງທີ່ຍົກເລີກບໍ່ໄດ້
            </Button>
          </Box>
        </Box>
      </Paper>
    </NavigationLayout>
  );
});

export default BookingNavbarControl;
