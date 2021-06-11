import React from "react";
import PageLayout from "../../../Components/PageLayout";
import { Button } from "@material-ui/core";
import { userNow, userLogOut } from '../../../Slices/Authentication/authSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AccountView = ({ ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <PageLayout title="My account" {...rest}>
      <div>
        <Button onClick={() => {
          dispatch(userLogOut());
          dispatch(userNow('quest'))
          history.push('/')
        }}>Log out</Button>
      </div>
    </PageLayout>
  );
};

export default AccountView;
