import React from "react";
import PageLayout from "../../../Components/PageLayout";
import { Button } from "@material-ui/core";

const AccountView = ({ ...rest }) => {
  return (
    <PageLayout title="My account" {...rest}>
      <div>
        <Button>Log out</Button>
      </div>
    </PageLayout>
  );
};

export default AccountView;
