import PrivateRoutesAdmin from './PrivateRoutesAdmin';
import BookingListUnCheckout from '../Views/StadiumUsers/StadiumBooking/Overview/AllBookingUnPayment';
import CancelingBooking from '../Views/StadiumUsers/StadiumBooking/Overview/CancelingBooking';
import ApproveBooking from '../Views/StadiumUsers/StadiumBooking/Overview/ApproveBooking';
import ActiveApproveBooking from '../Views/StadiumUsers/StadiumBooking/Overview/ActiveApproveBooking'
import VoidBooking from '../Views/StadiumUsers/StadiumBooking/Overview/VoidBooking';
import { Switch, Redirect, Route } from 'react-router-dom';


const RoutesBookingHistoryAdmin = () => {
    return (
      <>
        <Switch>
          <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking" exact>
            <BookingListUnCheckout />
          </PrivateRoutesAdmin>

          <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking/available-canceling">
            <CancelingBooking />
          </PrivateRoutesAdmin>

          <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking/approve-booking">
            <ApproveBooking />
          </PrivateRoutesAdmin>

          <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking/active-approve-booking">
            <ActiveApproveBooking />
          </PrivateRoutesAdmin>

          <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking/void-booking">
            <VoidBooking />
          </PrivateRoutesAdmin>
  
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </>
    );
  };
  
  export default RoutesBookingHistoryAdmin;