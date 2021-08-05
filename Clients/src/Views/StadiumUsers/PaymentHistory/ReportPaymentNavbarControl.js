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

const ReportPaymentNavbarControl = React.memo(() => {
  const classes = useStyles();
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [date, changeDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());

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
                ຈຳນວນບິນຊຳລະ:{" "}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {`3 ລາຍການ`}
              </Typography>
            </Box>
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
                ລາຄາທັງໝົດ:{" "}
              </Typography>
              <NumberFormat
                value={752000}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" ກີບ"}
                renderText={(value) => (
                  <Typography variant="h5" color="textPrimary">
                    {value}
                  </Typography>
                )}
              />
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
            <Button startIcon={<AdjustIcon />} color="inherit">
              ບິນຊຳລະທັງໝົດ
            </Button>
            <Button startIcon={<AdjustIcon />} color="inherit">
              ບິນຊຳລະທັງຄ່າເດີ່ນ ແລະ ເຄື່ອງດື່ມ
            </Button>
            <Button startIcon={<AdjustIcon />} color="inherit">
              ບິນຊຳລະສະເພາະຄ່າເດີ່ນ
            </Button>
            <Button startIcon={<AdjustIcon />} color="inherit">
              ບິນຊຳລະສະເພາະຄ່າເຄື່ອງດື່ມ
            </Button>
          </Box>
        </Box>
      </Paper>
    </NavigationLayout>
  );
});

export default ReportPaymentNavbarControl;
