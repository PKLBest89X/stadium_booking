import PrivateRoutesUsers from "./PrivateRoutesUsers";
import AllBooking from "../Views/Users/BookingHistory/AllBooking";
import AllBookingPaid from "../Views/Users/BookingHistory/AllBookingPaid";
import AllBookingUnPayment from "../Views/Users/BookingHistory/AllBookingUnPayment";
import CancelingBooking from "../Views/Users/BookingHistory/CancelingBooking";
import { Switch, Redirect, Route } from "react-router-dom";

const RoutesBookingHistoryUser = () => {
  return (
    <>
      <Switch>
        <PrivateRoutesUsers path="/booking-history" exact>
          <AllBooking />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/booking-history/allBooking-paid">
          <AllBookingPaid />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/booking-history/allBooking-unpaid">
          <AllBookingUnPayment />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/booking-history/available-canceling">
          <CancelingBooking />
        </PrivateRoutesUsers>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
};

export default RoutesBookingHistoryUser;
