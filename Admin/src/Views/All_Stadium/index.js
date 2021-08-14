import React from "react";
import PageLayout from "../../Components/PageLayout";

import ReportAllStadiumsNavbarControl from "./ReportAllStadiumsNavbarControl";
import RoutesReportStadiums from "../../Routes/RoutesReportStadiums";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";
import PopupLayout from "../../Components/PopupLayout";
import PopupDetails from "./PopupDetails";

const AllStadium = React.memo(({ ...rest }) => {
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  let showStadiumDetails = null;
  if (popupName === "showStadiumDetails" && isOpen === true) {
    showStadiumDetails = (
      <PopupLayout customWidth={true}>
        <PopupDetails />
      </PopupLayout>
    );
  }

  return (
    <>
      {showStadiumDetails}
      <PageLayout {...rest} title="ເດີ່ນທັງໝົດ">
        <ReportAllStadiumsNavbarControl />
        <RoutesReportStadiums />
      </PageLayout>
    </>
  );
});

export default AllStadium;
