import React, { forwardRef } from "react";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { onHandleSelectDate } from "../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";
import { useDispatch } from "react-redux";
import { onFilterAvailableTimes } from "../../../../../Slices/Features/Users/Booking/getTimeSlice";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  hiddenDatePicker: {
    display: "none",
  },
}));

const DatePickerBooking = forwardRef(({ open, selectedDate }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stadiumsSelected } = useShallowEqualSelector(
    (state) => state.getTimes
  );
  return (
    <div ref={ref}>
      <DatePicker
        className={classes.hiddenDatePicker}
        margin="normal"
        open={open}
        inputVariant="outlined"
        id="date-picker-dialog"
        label="ເລືອກມື້ຈອງເດີ່ນ"
        format="MM/dd/yyyy"
        minDate={new Date()}
        onClose={() => selectedDate(false)}
        onChange={(date) => {
          dispatch(onHandleSelectDate(moment(date).format("YYYY-MM-DD")));
          dispatch(
            onFilterAvailableTimes({
              dateData: moment(date).format("YYYY-MM-DD"),
              stadiumId: stadiumsSelected,
            })
          );
          selectedDate(false);
        }}
      />
    </div>
  );
});

export default DatePickerBooking;
