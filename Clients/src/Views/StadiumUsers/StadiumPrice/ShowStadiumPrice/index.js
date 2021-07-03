import React, { useEffect } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import PageLayout from "../../../../Components/PageLayout";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";
import StadiumPriceTable from "./StadiumPriceTable";
import Toolbar from "./Toobar";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const StadiumPrice = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { priceData } = useShallowEqualSelector((state) => state.stadiumPrice);
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
      history.replace("/404");
    }
  }, [history, checkResult]);

  const ShowEmptyStadiumPrice = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">ບໍ່ມີຂໍ້ມູນລາຄາຂອງເດີ່ນ</Typography>
    </div>
  );

  return (
    <PageLayout title="Stadium Price" {...rest}>
      <div className={classes.pageContainer}>
        <Box mb={3}>
          <Typography color="textPrimary" variant="h2">
            ລາຄາຂອງເດີ່ນ
          </Typography>
        </Box>
        <Divider />
        <Box mt={3}>
          <Toolbar />
          {priceData.length > 0 ? (
            <StadiumPriceTable />
          ) : (
            <ShowEmptyStadiumPrice />
          )}
        </Box>
      </div>
    </PageLayout>
  );
};

export default StadiumPrice;
