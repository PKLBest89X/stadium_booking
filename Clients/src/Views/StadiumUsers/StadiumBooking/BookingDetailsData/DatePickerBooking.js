import React, { forwardRef } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { onHandleSelectDateNonAccount } from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
import { useDispatch } from "react-redux";
import { onFilterAvailableTimesNonAccount } from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/getTimeNonAccountSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import moment from "moment";

const DatePickerBooking = forwardRef(({ dateData }, ref) => {
  const dispatch = useDispatch();
  const { stadiumsSelectedNonAccount } = useShallowEqualSelector(
    (state) => state.getTimesNonAccount
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
          dispatch(onHandleSelectDateNonAccount(moment(date).format("YYYY-MM-DD")));
          dispatch(
            onFilterAvailableTimesNonAccount({
              dateData: moment(date).format("YYYY-MM-DD"),
              stadiumId: stadiumsSelectedNonAccount,
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
