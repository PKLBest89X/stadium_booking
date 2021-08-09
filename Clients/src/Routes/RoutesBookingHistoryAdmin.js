import PrivateRoutesAdmin from './PrivateRoutesAdmin';
import BookingListUnCheckout from '../Views/StadiumUsers/StadiumBooking/Overview/AllBookingUnPayment';
import CancelingBooking from '../Views/StadiumUsers/StadiumBooking/Overview/CancelingBooking';
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
  
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </>
    );
  };
  
  export default RoutesBookingHistoryAdmin;