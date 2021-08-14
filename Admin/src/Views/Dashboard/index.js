import React, { useEffect } from "react";
import PageLayout from "../../Components/PageLayout";
import { fetchAuthSuperAdmin } from "../../middlewares/fetchAuth";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import StadiumsChart from "./StadiumsChart";
import ListAllStadiums from "./ListAllStadiums";
import TotalStadiumOwner from "./TotalStadiumOwner.js";
import TotalStadiums from "./TotalStadiums";
import LatestStadiumOwner from "./LatestStadiumOwner";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
    flex: 1,
  },
}));

const DashboardView = ({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    const superAdminToken = JSON.parse(
      localStorage.getItem("accessSuperAdminToken")
    );
    if (superAdminToken && superAdminToken.token) {
      dispatch(fetchAuthSuperAdmin(superAdminToken.token));
    }
  }, [dispatch]);

  return (
    <PageLayout {...rest} title="ໜ້າຫຼັກ">
      <div className={classes.pageContainer}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <TotalStadiumOwner />
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <TotalStadiums />
          </Grid>
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <ListAllStadiums />
            <LatestStadiumOwner />
          </Grid>
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <StadiumsChart />
          </Grid>
        </Grid>
      </div>
    </PageLayout>
  );
};

export default DashboardView;
