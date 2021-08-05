import React from "react";
import PageLayout from "../../../Components/PageLayout";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportBookingNavbarControl from "./ReportBookingNavbarControl";
import ReportBookingList from "./ReportBookingList";

const fakeData = [
  {
    c_name: "ຈະເລີນສີ",
    logo: "E3IzI-yVgAEuKyv.jpg",
    start: "07:00",
    end: "08:00"
  },
  {
    c_name: "ຄຳໝັ້ນ",
    logo: "test_stadium_logo.jpg",
    start: "09:00",
    end: "10:00"
  },
  {
    c_name: "ແວວປັນຍາ",
    logo: "KhampasongStadiumLogo.jpg",
    start: "15:00",
    end: "16:00"
  },
  {
    c_name: "ມີໄຊ",
    logo: "singha_stadium_logo.jpg",
    start: "10:00",
    end: "11:00"
  },
];

const AdminBookingHistory = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
      <ReportBookingNavbarControl />
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ລາຍງານການຈອງເດີ່ນ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        <ReportBookingList bookingBillData={fakeData} />
      </Box>
    </PageLayout>
  );
};

export default AdminBookingHistory;
