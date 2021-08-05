import React from "react";
import PageLayout from "../../Components/PageLayout";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportAllStadiumsNavbarControl from "./ReportAllStadiumsNavbarControl";
import AllStadiumsList from "./AllStadiumsList";

const fakeData = [
  {
    st_name: "Saysettha Stadium",
    logo: "E3IzI-yVgAEuKyv.jpg",
    status: "ພ້ອມໃຫ້ບໍລິການ",
  },
  {
    st_name: "PKL Stadium",
    logo: "test_stadium_logo.jpg",
    status: "ພ້ອມໃຫ້ບໍລິການ",
  },
  {
    st_name: "KPS Stadium",
    logo: "KhampasongStadiumLogo.jpg",
    status: "ພ້ອມໃຫ້ບໍລິການ",
  },
  {
    st_name: "Singha Sport FC",
    logo: "singha_stadium_logo.jpg",
    status: "ບໍ່ພ້ອມໃຫ້ບໍລິການ",
  },
];

const AllStadium = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
      <ReportAllStadiumsNavbarControl />
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ເດີ່ນທັງໝົດ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        <AllStadiumsList bookingBillData={fakeData} />
      </Box>
    </PageLayout>
  );
};

export default AllStadium;
