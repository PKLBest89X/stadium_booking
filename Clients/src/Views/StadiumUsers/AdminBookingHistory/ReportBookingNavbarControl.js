import React, { useState, useMemo, useCallback, useRef } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import NavigationLayout from "../../../Components/NavigationLayout";
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
import AdjustIcon from "@material-ui/icons/Adjust";
import NumberFormat from "react-number-format";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";

import { useHistory, useParams } from "react-router-dom";

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

const ReportBookingNavbarControl = React.memo(() => {
  const classes = useStyles();
  let history = useHistory();
  const { stadiumId_Admin } = useParams();
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [date, changeDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMonthChange = async () => {
    SwiperCore.use([Keyboard, Navigation, Pagination]);

    // just select random days to simulate server side based data
    return new Promise((resolve) => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };

  const RoutesButton = (pathName) => {
    history.push(`/admin/stadium/${stadiumId_Admin}/booking-history/${pathName}`);
  };

  return (
    <NavigationLayout>
      <Box mb={2}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="ຄົ້ນຫາຕາມຊື່ລູກຄ້າ, ສະໜາມ..."
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
            ເລືອກຕາມວັນລົງທະບຽນ
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
                ການຈອງທັງໝົດ:{" "}
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
              startIcon={<AdjustIcon />}
              color="inherit"
              onClick={() => RoutesButton("")}
            >
              ການຈອງທັງໝົດ
            </Button>
            <Button
              startIcon={<AdjustIcon />}
              color="inherit"
              onClick={() => RoutesButton("booking-unPaid")}
            >
              ການຈອງທີ່ຍັງບໍ່ໄດ້ຊຳລະຄ່າ
            </Button>
            <Button
              startIcon={<AdjustIcon />}
              color="inherit"
              onClick={() => RoutesButton("booking-paid")}
            >
              ການຈອງທີ່ຊຳລະຄ່າແລ້ວ
            </Button>
          </Box>
        </Box>
      </Paper>
    </NavigationLayout>
  );
});

export default ReportBookingNavbarControl;