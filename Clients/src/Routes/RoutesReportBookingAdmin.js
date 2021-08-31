import PrivateRoutesAdmin from "./PrivateRoutesAdmin";
import ReportAllBooking from '../Views/StadiumUsers/AdminBookingHistory/ReportAllBooking';
import ReportBookingPaid from '../Views/StadiumUsers/AdminBookingHistory/ReportBookingPaid';
import ReportBookingUnPaid from '../Views/StadiumUsers/AdminBookingHistory/ReportBookingUnPaid';
import ReportActiveBooking from "../Views/StadiumUsers/AdminBookingHistory/ReportActiveBooking";
import ReportPendingBooking from "../Views/StadiumUsers/AdminBookingHistory/ReportPendingBooking";
import ReportVoidBooking from "../Views/StadiumUsers/AdminBookingHistory/ReportVoidBooking";
import { Switch, Redirect, Route } from "react-router-dom";

const RoutesReportBookingAdmin = () => {
  return (
    <>
      <Switch>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history" exact>
          <ReportAllBooking/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history/booking-paid">
          <ReportBookingPaid/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history/booking-unPaid">
          <ReportBookingUnPaid/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history/active-booking">
          <ReportActiveBooking/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history/pending-booking">
          <ReportPendingBooking/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history/void-booking">
          <ReportVoidBooking/>
        </PrivateRoutesAdmin>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
};

export default RoutesReportBookingAdmin;
