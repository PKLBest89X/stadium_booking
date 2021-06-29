import React, { useEffect } from "react";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";
import StadiumsTable from "./StadiumsTable";
import Toolbar from "./Toobar";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "1rem",
  },
}));

const ShowStadiumDetails = ({ getTabChange }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumsData } = useShallowEqualSelector(
    (state) => state.stadiumDetails
  );
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => getTabChange(1), [getTabChange]);

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

  const ShowEmptyStadiums = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={10}
      boxShadow="1px 1px 3px 1px rgba(0, 0, 0, .5)"
    >
      <Typography variant="h3">ບໍ່ມີເດີ່ນເຕະບານ</Typography>
    </Box>
  );

  return (
    <ChildPageLayout title="Stadium Details">
      <div className={classes.pageContainer}>
        <Box mb={3}>
          <Typography color="textPrimary" variant="h2">
            ສະໜາມຂອງເດີ່ນ
          </Typography>
        </Box>
        <Divider />
        <Box mt={3}>
          <Toolbar />
          {stadiumsData.length > 0 ? <StadiumsTable /> : <ShowEmptyStadiums />}
        </Box>
      </div>
    </ChildPageLayout>
  );
};

export default ShowStadiumDetails;
