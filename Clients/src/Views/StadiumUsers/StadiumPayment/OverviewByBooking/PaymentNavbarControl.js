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

import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import NavigationLayout from "../../../../Components/NavigationLayout";

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

const PaymentNavbarControl = React.memo(() => {
  const classes = useStyles();
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [date, changeDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());

  const dispatch = useDispatch();
  const { paymentData } = useShallowEqualSelector((state) => state.payment);
  const stateRef = useRef(paymentData);

  const { bookingAllValue, bookingOnWeb, bookingOnPhone } = useShallowEqualSelector((state) => state.prePayment);

  useMemo(
    () => paymentData.forEach((items) => (stateRef.current = items)),
    [paymentData]
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

  return (
    <NavigationLayout>
      <Box mb={2}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="ຄົ້ນຫາຕາມຊື່ລູກຄ້າ, ​ເບີໂທ, ມື້ຈອງ..."
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
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" color="textSecondary">
            ເລືອກຕາມວັນ
          </Typography>
          <Button color="primary" variant="outlined">
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
              ສະຫຼຸບລວມ
            </Typography>
          </Box>
          <Divider />
          <Box
            display="block"
            justifyContent="center"
            alignItems="center"
            padding="1rem"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              width="100%"
              mb={2}
              mt={2}
            >
              <Typography variant="h5" color="textPrimary">
                ທັງໝົດ:{" "}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {`${bookingAllValue} ລາຍການ`}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              height="100%"
              width="100%"
              mb={2}
              mt={2}
            >
              <Typography variant="h5" color="textPrimary">
                ຈອງຜ່ານເວັບ:{" "}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {`${bookingOnWeb} ລາຍການ`}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              height="100%"
              width="100%"
              mb={2}
              mt={2}
            >
              <Typography variant="h5" color="textPrimary">
                ໂທຈອງ:{" "}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {`${bookingOnPhone} ລາຍການ`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </NavigationLayout>
  );
});

export default PaymentNavbarControl;
