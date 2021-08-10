import React from "react";
import PageLayout from "../../../Components/PageLayout";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportBookingNavbarControl from "./ReportBookingNavbarControl";
import RoutesReportBookingAdmin from "../../../Routes/RoutesReportBookingAdmin";


const AdminBookingHistory = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
      <ReportBookingNavbarControl />
      <RoutesReportBookingAdmin/>
    </PageLayout>
  );
};

export default AdminBookingHistory;
