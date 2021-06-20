import { Switch, Redirect, Route } from "react-router-dom";
import StadiumFeed from "../Views/Users/StadiumDetails/StadiumFeed";
import StadiumPosts from "../Views/Users/StadiumDetails/StadiumPosts";
import StadiumInformation from '../Views/Users/StadiumDetails/StadiumInfomation'
import StadiumBooking from '../Views/Users/StadiumDetails/StadiumBooking';
import PrivateRoutesUsers from "./PrivateRoutesUsers";

const RoutesChildComponentsUser = ({ tabChange, ...rest }) => {
  return (
    <>
      <Switch>
        <Route path="/stadium/:stadiumId" exact>
          <StadiumFeed getTabChange={tabChange} {...rest}/>
        </Route>

        <Route path="/stadium/:stadiumId/posts">
          <StadiumPosts getTabChange={tabChange} {...rest}/>
        </Route>

        <Route path="/stadium/:stadiumId/information">
          <StadiumInformation getTabChange={tabChange} {...rest} />
        </Route>

        <PrivateRoutesUsers path="/stadium/:stadiumId/stadium-booking">
          <StadiumBooking getTabChange={tabChange} {...rest} />
        </PrivateRoutesUsers>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>

  );
};

export default RoutesChildComponentsUser;
