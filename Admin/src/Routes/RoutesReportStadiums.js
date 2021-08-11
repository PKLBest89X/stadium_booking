import PrivateRoutes from "./PrivateRoutes";
import AllStadiums from "../Views/All_Stadium/AllStadiums";
import AvailableUsing from "../Views/All_Stadium/AvailableUsing";
import NotAvailableUsing from "../Views/All_Stadium/NotAvailableUsing";
import { Switch, Redirect, Route } from "react-router-dom";

const RoutesReportStadiums = () => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/all_stadiums" exact>
          <AllStadiums />
        </PrivateRoutes>

        <PrivateRoutes path="/all_stadiums/available-stadiums" >
          <AvailableUsing />
        </PrivateRoutes>

        <PrivateRoutes path="/all_stadiums/not-available-stadiums">
          <NotAvailableUsing />
        </PrivateRoutes>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
};

export default RoutesReportStadiums;
