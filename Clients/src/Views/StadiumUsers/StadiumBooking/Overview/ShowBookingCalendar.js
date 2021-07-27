import React, { useState } from "react";
import { Badge } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
// import { makeJSDateObject } from "../../../utils/helpers";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const ShowBookingCalendar = () => {
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
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
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="With server data"
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={handleMonthChange}
          // renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          // //   const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          // //   const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());

          //   // You can also use our internal <Day /> component
          //   return <Badge badgeContent={isSelected ? "🌚" : undefined}>{dayComponent}</Badge>;
          // }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default ShowBookingCalendar;
