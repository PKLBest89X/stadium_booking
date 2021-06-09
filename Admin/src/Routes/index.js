import DashboardView from "../Views/Dashboard";
import AllStadium from "../Views/All_Stadium";
import StadiumOwner from "../Views/Stadium_Owner";
import AddStadiumOwner from "../Views/Stadium_Owner/AddStadium_ower";
import Account from "../Views/Account/AccountView";
import PrivateRoutes from "./PrivateRoutes";

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

const RoutesComponents = ({ ...rest }) => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <DashboardView {...rest} />
        </Route>

        <PrivateRoutes path="/all_stadiums">
          <AllStadium {...rest} />
        </PrivateRoutes>

        <Route path="/stadium_owner">
          <StadiumOwner {...rest} />
        </Route>

        <Route path={`/stadium_ownergg`}>
          <AddStadiumOwner {...rest}/>
        </Route>

        <PrivateRoutes path="/account">
          <Account {...rest} />
        </PrivateRoutes>

        <Route path="*">
          <Redirect to="/404" />
        </Route>

        <Redirect to="/login" />
        <Redirect to="/register" />
      </Switch>
    </>
  );
};

export default RoutesComponents;
