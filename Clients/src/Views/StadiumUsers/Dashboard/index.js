import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { useDispatch } from "react-redux";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TotalEmployees from "./TotalEmployees";
import TotalFollowers from "./TotalFollowers";
import TotalReserves from "./TotalReserves";
import TotalProfit from "./TotalProfit";
import ListStadiums from "./ListStadiums";
import ReserveByCustomers from "./ReserveByCustomers";
import LastPayments from "./LastPayments";
import LastReserves from "./LastReserves";
import { fetchCheckStadium } from '../../../middlewares/fetchCheckValidData/fetchCheckValidData';

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: '2rem',
    flex: 1,
  }
}))

const DashboardView = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace('/404')
    }
  }, [history, checkResult]);
  return (
    <PageLayout title="Admin Dashboard" {...rest}>
      <div className={classes.pageContainer}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalEmployees />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFollowers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalReserves />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <ListStadiums />
          </Grid>
          <Grid item lg={4} md={12} xl={3} xs={12}>
            <ReserveByCustomers />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LastPayments />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LastReserves />
          </Grid>
        </Grid>
      </div>
    </PageLayout>
  );
};

export default DashboardView;
