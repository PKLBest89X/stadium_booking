import React from "react";
import PageLayout from "../../../Components/PageLayout";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import PopupLayout from "../../../Components/PopupLayout";
import PopupDetails from "./PopupDetails";

import { Box, Typography, Button, Divider } from "@material-ui/core";
import ReportPaymentNavbarControl from "./ReportPaymentNavbarControl";
import RouteReportPaymentAdmin from "../../../Routes/RoutesReportPaymentAdmin";

const PaymentHistory = React.memo(({ ...rest }) => {
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);

  let showReportBookingInfo = null;
  if (popupName === "showReportPaymentInfo" && isOpen === true) {
    showReportBookingInfo = (
      <PopupLayout customWidth={true}>
        <PopupDetails />
      </PopupLayout>
    );
  }

  return (
    <>
      {showReportBookingInfo}
      <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
        <ReportPaymentNavbarControl />
        <RouteReportPaymentAdmin />
      </PageLayout>
    </>
  );
});

export default PaymentHistory;
