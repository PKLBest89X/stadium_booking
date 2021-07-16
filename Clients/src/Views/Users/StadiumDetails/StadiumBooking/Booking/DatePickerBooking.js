import React, { forwardRef } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

const DatePickerBooking = forwardRef(({ dateData, onSelectedDate }, ref) => {
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
        onChange={onSelectedDate}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </div>
  );
});

export default DatePickerBooking;
