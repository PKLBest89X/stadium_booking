import React from "react";
import PageLayout from "../../../Components/PageLayout";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportPaymentNavbarControl from "./ReportPaymentNavbarControl";
import RouteReportPaymentAdmin from "../../../Routes/RoutesReportPaymentAdmin";

const PaymentHistory = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
      <ReportPaymentNavbarControl />
      <RouteReportPaymentAdmin />
    </PageLayout>
  );
};

export default PaymentHistory;
