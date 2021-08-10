import PrivateRoutesAdmin from "./PrivateRoutesAdmin";
import ReportAllBooking from '../Views/StadiumUsers/AdminBookingHistory/ReportAllBooking';
import ReportBookingPaid from '../Views/StadiumUsers/AdminBookingHistory/ReportBookingPaid';
import ReportBookingUnPaid from '../Views/StadiumUsers/AdminBookingHistory/ReportBookingUnPaid';
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

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
};

export default RoutesReportBookingAdmin;
