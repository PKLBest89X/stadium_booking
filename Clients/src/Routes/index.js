import Home from "../Views/Users/Home/index";
import Stadiums from "../Views/Users/Stadiums";
import StadiumDetails from "../Views/Users/StadiumDetails";
import BookingHistory from "../Views/Users/BookingHistory";
import StadiumFollow from "../Views/Users/StadiumsFollow";
import AccountView from '../Views/Users/Account'

import DashboardView from "../Views/StadiumUsers/Dashboard";


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

        <Route path="/ເດີ່ນ">
          <Stadiums {...rest} />
        </Route>

        <PrivateRoutesUsers path="/booking-history">
          <BookingHistory {...rest} />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/stadium-follow">
          <StadiumFollow {...rest} />
        </PrivateRoutesUsers>

        <Route path="/stadium/:stadiumName">
          <StadiumDetails {...rest} />
        </Route>

        <PrivateRoutesUsers path="/account">
          <AccountView {...rest} />
        </PrivateRoutesUsers>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin" >
          <DashboardView {...rest} />
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
