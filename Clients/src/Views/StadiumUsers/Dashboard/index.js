import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { useDispatch } from 'react-redux';
import { fetchAuthAdmin } from '../../../middlewares/fetchAuth/fetchStadiumUsers';
import { useHistory, useParams } from 'react-router-dom';
import { useShallowEqualSelector } from '../../../Components/useShallowEqualSelector';

const DashboardView = ({ ...rest }) => {
  const { data } = useShallowEqualSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
    }
  }, [dispatch]);
  return (
    <PageLayout title="Admin Dashboard" {...rest}>
      <h1>ສະບາຍ Admin ເດີ່ນ</h1>
    </PageLayout>
  );
};

export default DashboardView;
