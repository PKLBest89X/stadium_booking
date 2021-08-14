import React from "react";
import PageLayout from "../../../Components/PageLayout";
import PopupLayout from '../../../Components/PopupLayout';
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";

import ReportBookingNavbarControl from "./ReportBookingNavbarControl";
import RoutesReportBookingAdmin from "../../../Routes/RoutesReportBookingAdmin";
import PopupDetails from './PopupDetails';

const AdminBookingHistory = React.memo(({ ...rest }) => {
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);

  let showReportBookingInfo = null;
  if (popupName === "showReportBookingInfo" && isOpen === true) {
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
        <ReportBookingNavbarControl />
        <RoutesReportBookingAdmin />
      </PageLayout>
    </>
  );
});

export default AdminBookingHistory;
