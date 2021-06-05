import React from "react";
import PageLayout from '../../Components/PageLayout'

const DashboardView = ({ ...rest }) => {
  return (
    <PageLayout {...rest} title="ໜ້າຫຼັກ">
      <div>
        <h1>ສະບາຍດີ home</h1>
      </div>
    </PageLayout>
  );
};

export default DashboardView;
