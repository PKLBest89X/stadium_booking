import DashboardView from "../Views/Dashboard";
import AllStadium from "../Views/All_Stadium";
import StadiumOwner from "../Views/Stadium_Owner/ShowStadium_owner";
import OverviewAccount from '../Views/Account/OverviewAccount';
import PrivateRoutes from "./PrivateRoutes";

import { Switch, Route, Redirect } from "react-router-dom";

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

        <PrivateRoutes path="/account">
          <OverviewAccount {...rest} />
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
