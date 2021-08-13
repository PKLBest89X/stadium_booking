import Home from "../Views/Users/Home/index";
import Stadiums from "../Views/Users/Stadiums";
import StadiumDetails from "../Views/Users/StadiumDetails";
import BookingHistory from "../Views/Users/BookingHistory";
import StadiumFollow from "../Views/Users/StadiumsFollow";
import OverviewAccount from '../Views/Users/Account/OverviewAccount';

import DashboardView from "../Views/StadiumUsers/Dashboard";
import StadiumView from '../Views/StadiumUsers/Stadiums';
import ShowStadiumDetails from "../Views/StadiumUsers/StadiumDetails/ShowStadiumDetails";
import StadiumDrink from "../Views/StadiumUsers/StadiumDrink/ShowStadiumDrink";
import StadiumPrice from "../Views/StadiumUsers/StadiumPrice/ShowStadiumPrice";
import StadiumPosts from '../Views/StadiumUsers/StadiumPosts/ShowAllPost';
import StadiumEmployee from '../Views/StadiumUsers/StadiumEmployee/ShowAllEmployee';

import OverviewBooking from '../Views/StadiumUsers/StadiumBooking/Overview';
import BookingView from "../Views/StadiumUsers/StadiumBooking/BookingView";
import BookingDetailsData from '../Views/StadiumUsers/StadiumBooking/BookingDetailsData';
import OverviewByBooking from '../Views/StadiumUsers/StadiumPayment/OverviewByBooking';
import Payment from '../Views/StadiumUsers/StadiumPayment/Payment';

import AdminBookingHistory from "../Views/StadiumUsers/AdminBookingHistory";
import PaymentHistory from '../Views/StadiumUsers/PaymentHistory';
import OverviewAccountAdmin from '../Views/StadiumUsers/Account/OverviewAccount';

import PrivateRoutesAdmin from "./PrivateRoutesAdmin";
import PrivateRoutesUsers from "./PrivateRoutesUsers";

import { Switch, Route, Redirect } from "react-router-dom";

const RoutesComponents = ({ ...rest }) => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home {...rest} />
        </Route>

        <Route path="/stadium" exact>
          <Stadiums {...rest} />
        </Route>

        <PrivateRoutesUsers path="/booking-history">
          <BookingHistory {...rest} />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/stadium-follow">
          <StadiumFollow {...rest} />
        </PrivateRoutesUsers>

        <Route path="/stadium/:stadiumId">
          <StadiumDetails {...rest} />
        </Route>

        <PrivateRoutesUsers path="/account">
          <OverviewAccount {...rest} />
        </PrivateRoutesUsers>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin" exact>
          <DashboardView {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-info">
          <StadiumView {...rest} />
        </PrivateRoutesAdmin>
        
        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-post" >
          <StadiumPosts {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-details" >
          <ShowStadiumDetails {...rest}/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-price" >
          <StadiumPrice {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/employee-manage" >
          <StadiumEmployee {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-drink" >
          <StadiumDrink {...rest} />
        </PrivateRoutesAdmin>


        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking" >
          <OverviewBooking {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking/:bookingId" exact>
          <BookingView {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking/:bookingId/manage">
          <BookingDetailsData {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-payment" exact>
          <OverviewByBooking {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-payment/:paymentId">
          <Payment {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history">
          <AdminBookingHistory {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/payment-history">
          <PaymentHistory {...rest} />
        </PrivateRoutesAdmin>
        
        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/account">
          <OverviewAccountAdmin {...rest} />
        </PrivateRoutesAdmin>

        <Route path="*">
          <Redirect to="/404" />
        </Route>

        <Redirect to="/login" />
        <Redirect to="/register" />
        <Redirect to="/admin/login" />
        <Redirect to="/admin/stadium/create" />
      </Switch>
    </>
  );
};

export default RoutesComponents;
