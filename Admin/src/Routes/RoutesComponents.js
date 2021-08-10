import DashboardView from "../Views/Dashboard";
import AllStadium from "../Views/All_Stadium";
import StadiumOwner from "../Views/Stadium_Owner";
import Account from "../Views/Account/AccountView";
import PrivateRoutes from "./PrivateRoutes";

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

const RoutesComponents = ({ ...rest }) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/" exact>
          <DashboardView {...rest} />
        </PrivateRoutes>

        <PrivateRoutes path="/all_stadiums">
          <AllStadium {...rest} />
        </PrivateRoutes>

        <PrivateRoutes path="/stadium_owner">
          <StadiumOwner {...rest} />
        </PrivateRoutes>

        {/* <Route path={`/stadium_ownergg`}>
          <AddStadiumOwner {...rest}/>
        </Route> */}

        <PrivateRoutes path="/account">
          <Account {...rest} />
        </PrivateRoutes>

        <Route path="*">
          <Redirect to="/404" />
        </Route>

        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default RoutesComponents;
