import React, { forwardRef } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { onHandleSelectDate } from "../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";
import { useDispatch } from "react-redux";
import { onFilterAvailableTimes } from "../../../../../Slices/Features/Users/Booking/getTimeSlice";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import moment from "moment";

const DatePickerBooking = forwardRef(({ dateData }, ref) => {
  const dispatch = useDispatch();
  const { stadiumsSelected } = useShallowEqualSelector(
    (state) => state.getTimes
  );
  return (
    <div ref={ref}>
      <KeyboardDatePicker
        margin="normal"
        autoOk
        required
        inputVariant="outlined"
        id="date-picker-dialog"
        label="ເລືອກມື້ຈອງເດີ່ນ"
        format="MM/dd/yyyy"
        value={dateData}
        minDate={new Date()}
        onChange={(date) => {
          dispatch(onHandleSelectDate(moment(date).format("YYYY-MM-DD")));
          dispatch(
            onFilterAvailableTimes({
              dateData: moment(date).format("YYYY-MM-DD"),
              stadiumId: stadiumsSelected,
            })
          );
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </div>
  );
});

export default DatePickerBooking;