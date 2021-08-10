import React from "react";
import PageLayout from "../../Components/PageLayout";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportAllStadiumsNavbarControl from "./ReportAllStadiumsNavbarControl";
import RoutesReportStadiums from "../../Routes/RoutesReportStadiums";

const AllStadium = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
      <ReportAllStadiumsNavbarControl />
      <RoutesReportStadiums />
    </PageLayout>
  );
};

export default AllStadium;
