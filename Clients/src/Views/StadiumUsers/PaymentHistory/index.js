import React from "react";
import PageLayout from "../../../Components/PageLayout";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportPaymentNavbarControl from "./ReportPaymentNavbarControl";
import ReportPaymentList from "./ReportPaymentList";


const fakeData = [
  {
    c_name: "ຄຳປະສົງ",
    logo: "E3IzI-yVgAEuKyv.jpg",
    start: "07:00",
    end: "08:00"
  },
  {
    c_name: "ໄຊປັນຍາ",
    logo: "test_stadium_logo.jpg",
    start: "16:00",
    end: "17:00"
  },
  {
    c_name: "ສີວິໄລ",
    logo: "KhampasongStadiumLogo.jpg",
    start: "15:00",
    end: "16:00"
  },
];

const PaymentHistory = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
      <ReportPaymentNavbarControl />
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ລາຍງານການຊຳລະຄ່າເດີ່ນ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        <ReportPaymentList bookingBillData={fakeData} />
      </Box>
    </PageLayout>
  );
};

export default PaymentHistory;
