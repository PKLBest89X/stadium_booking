import PrivateRoutesAdmin from "./PrivateRoutesAdmin";
import ReportAllPayment from "../Views/StadiumUsers/PaymentHistory/ReportAllPayment";
import ReportStadiumsPayment from "../Views/StadiumUsers/PaymentHistory/ReportStadiumsPayment";
import ReportWaterWithStadiumsPayment from "../Views/StadiumUsers/PaymentHistory/ReportWaterWithStadiumsPayment";
import { Switch, Redirect, Route } from "react-router-dom";

const RouteReportPaymentAdmin = () => {
  return (
    <>
      <Switch>
        <PrivateRoutesAdmin
          path="/admin/stadium/:stadiumId_Admin/payment-history"
          exact
        >
          <ReportAllPayment />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/payment-history/payment-water_and_stadiums">
        <ReportWaterWithStadiumsPayment />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/payment-history/payment-stadiums">
          <ReportStadiumsPayment />
        </PrivateRoutesAdmin>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
};

export default RouteReportPaymentAdmin;
