import Home from "../Views/Users/Home/index";
import Stadiums from "../Views/Users/Stadiums";
import StadiumDetails from "../Views/Users/StadiumDetails";
import BookingHistory from "../Views/Users/BookingHistory";
import StadiumFollow from "../Views/Users/StadiumsFollow";
import AccountView from '../Views/Users/Account'

import DashboardView from "../Views/StadiumUsers/Dashboard";
import StadiumView from '../Views/StadiumUsers/Stadiums';
import ShowStadiumDetails from "../Views/StadiumUsers/StadiumDetails/ShowStadiumDetails";
import StadiumDrink from "../Views/StadiumUsers/StadiumDrink/ShowStadiumDrink";
import StadiumPrice from "../Views/StadiumUsers/StadiumPrice/ShowStadiumPrice";
import StadiumPosts from '../Views/StadiumUsers/StadiumPosts/ShowAllPost';
import StadiumEmployee from '../Views/StadiumUsers/StadiumEmployee/ShowAllEmployee';

import StadiumBooking from '../Views/StadiumUsers/StadiumBooking';
import StadiumPayment from '../Views/StadiumUsers/StadiumPayment';
import AdminBookingHistory from "../Views/StadiumUsers/AdminBookingHistory";
import PaymentHistory from '../Views/StadiumUsers/PaymentHistory';
import AdminAccountView from '../Views/StadiumUsers/Account/AccountView'

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
          <AccountView {...rest} />
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


        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking">
          <StadiumBooking {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-payment">
          <StadiumPayment {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/booking-history">
          <AdminBookingHistory {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/payment-history">
          <PaymentHistory {...rest} />
        </PrivateRoutesAdmin>
        
        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/account">
          <AdminAccountView {...rest} />
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
