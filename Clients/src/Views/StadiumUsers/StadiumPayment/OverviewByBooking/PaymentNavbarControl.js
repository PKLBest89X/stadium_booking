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
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAddPayment } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";
import { onSellOnlyWater } from "../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
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
  const { stadiumId_Admin } = useParams();
  let history = useHistory();
  const { url } = useRouteMatch();
  const { paymentData } = useShallowEqualSelector((state) => state.payment);
  const stateRef = useRef(paymentData);

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

  const onGetCurrentPayment = useCallback(async () => {
    try {
      const staffToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      if (staffToken && staffToken.token) {
        const dataRequest = {
          stadiumId: stadiumId_Admin,
          token: staffToken.token,
        };
        const addPaymentRequest = await dispatch(fetchAddPayment(dataRequest));
        const getResult = unwrapResult(addPaymentRequest);
        if (getResult.status !== 400) {
          history.push(`${url}/${stateRef.current.bp_id}`);
          dispatch(onSellOnlyWater());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, history, url, stadiumId_Admin]);

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
                {`4 ລາຍການ`}
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
                {`3 ລາຍການ`}
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
                {`1 ລາຍການ`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </NavigationLayout>
  );
});

export default PaymentNavbarControl;
