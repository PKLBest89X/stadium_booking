import React from "react";
import PageLayout from "../../../Components/PageLayout";

const DashboardView = ({ ...rest }) => {
  return (
    <PageLayout title="Admin Dashboard" {...rest}>
      <h1>ສະບາຍ Admin ເດີ່ນ</h1>
    </PageLayout>
  );
};

export default DashboardView;
