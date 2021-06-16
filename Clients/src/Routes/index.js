import Home from "../Views/Users/Home/index";
import Stadiums from "../Views/Users/Stadiums";
import StadiumDetails from "../Views/Users/StadiumDetails";
import BookingHistory from "../Views/Users/BookingHistory";
import StadiumFollow from "../Views/Users/StadiumsFollow";
import AccountView from '../Views/Users/Account'

import DashboardView from "../Views/StadiumUsers/Dashboard";
import StadiumView from '../Views/StadiumUsers/Stadiums';
import StadiumPosts from '../Views/StadiumUsers/StadiumPosts/ShowAllPost';
import AddPost from '../Views/StadiumUsers/StadiumPosts/AddPost';
import EditPost from '../Views/StadiumUsers/StadiumPosts/EditPost';
import StadiumEmployee from '../Views/StadiumUsers/StadiumEmployee';
import StadiumPrice from '../Views/StadiumUsers/StadiumPrice';
import StadiumDrink from '../Views/StadiumUsers/StadiumDrink';
import StadiumBooking from '../Views/StadiumUsers/StadiumBooking';
import StadiumPayment from '../Views/StadiumUsers/StadiumPayment';

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

        <Route path="/stadium">
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

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-details">
          <StadiumView {...rest} />
        </PrivateRoutesAdmin>
        
        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-post" exact>
          <StadiumPosts {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-post/add-post">
          <AddPost {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-post/edit-post/:postId">
          <EditPost {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/employee-manage">
          <StadiumEmployee {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-price">
          <StadiumPrice {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-drink">
          <StadiumDrink {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-booking">
          <StadiumBooking {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/stadium-payment">
          <StadiumPayment {...rest} />
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
