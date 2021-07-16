import { Switch, Redirect, Route } from "react-router-dom";
import StadiumFeed from "../Views/Users/StadiumDetails/StadiumFeed";
import StadiumPosts from "../Views/Users/StadiumDetails/StadiumPosts";
import StadiumInformation from "../Views/Users/StadiumDetails/StadiumInfomation";
import StadiumBooking from "../Views/Users/StadiumDetails/StadiumBooking/OverviewBooking";
import MyBooking from "../Views/Users/StadiumDetails/StadiumBooking/MyBooking";
import Booking from "../Views/Users/StadiumDetails/StadiumBooking/Booking";
import PrivateRoutesUsers from "./PrivateRoutesUsers";

const RoutesChildComponentsUser = ({ tabChange, ...rest }) => {
  return (
    <>
      <Switch>
        <Route path="/stadium/:stadiumId" exact>
          <StadiumFeed getTabChange={tabChange} {...rest} />
        </Route>

        <Route path="/stadium/:stadiumId/posts">
          <StadiumPosts getTabChange={tabChange} {...rest} />
        </Route>

        <Route path="/stadium/:stadiumId/information">
          <StadiumInformation getTabChange={tabChange} {...rest} />
        </Route>

        <PrivateRoutesUsers path="/stadium/:stadiumId/stadium-booking" exact>
          <StadiumBooking getTabChange={tabChange} {...rest} />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/stadium/:stadiumId/stadium-booking/:bookingId" exact>
          <MyBooking getTabChange={tabChange} {...rest} />
        </PrivateRoutesUsers>

        <PrivateRoutesUsers path="/stadium/:stadiumId/stadium-booking/:bookingId/manage">
          <Booking getTabChange={tabChange} {...rest} />
        </PrivateRoutesUsers>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
};

export default RoutesChildComponentsUser;
