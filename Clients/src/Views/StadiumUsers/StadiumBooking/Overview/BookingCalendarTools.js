import React, { useState } from "react";
import { Badge, Card } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Button, Grid, InputBase, Paper, IconButton } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  toolbarLayout: {
    position: "sticky",
    top: 0,
    left: 0,
    padding: "1rem",
    zIndex: 2,
    [theme.breakpoints.down(350)]: {
      padding: "1rem .5rem",
    },
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none",
    backgroundColor: '#CDCDCD'
  },
  toolbarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    "& > :first-child": {
      display: "flex",
      alignItems: "center",
    },


    "& > :last-child": {
      "& > button": {
        border: "1px solid #f3f3f3",
      },
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const ShowBookingCalendar = React.memo(({ currentBooking }) => {
  const classes = useStyles();
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [date, changeDate] = useState(new Date());

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
    <Card elevation={10} className={classes.toolbarLayout}>
      <div className={classes.toolbarContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            inputVariant="outlined"
            id="date-picker-dialog"
            label="ເລືອກມື້ຈອງເດີ່ນ"
            format="MM/dd/yyyy"
            openTo="date"
            value={date}
            onChange={changeDate}
          />
        </MuiPickersUtilsProvider>
        <Button onClick={currentBooking} color="primary" variant="contained">
          ຈອງເດີ່ນ
        </Button>
      </div>
    </Card>
  );
});

export default ShowBookingCalendar;
