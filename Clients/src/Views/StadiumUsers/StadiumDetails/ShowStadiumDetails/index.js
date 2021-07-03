import React, { useEffect } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadiumDetails } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import PageLayout from "../../../../Components/PageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";
import StadiumsTable from "./StadiumsTable";
import Toolbar from "./Toobar";
import AddStadiumDetails from "../AddStadiumDetails";
import EditStadiumDetails from "../EditStadiumDetails";

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

const ShowStadiumDetails = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { stadiumsSuccess } = useShallowEqualSelector(
    (state) => state.stadiumDetails
  );
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

  useEffect(() => {
    dispatch(fetchGetStadiumDetails(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyStadiumDetails = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">ບໍ່ມີເດີ່ນເຕະບານ</Typography>
    </div>
  );

  let AddStadiumsForm = null;
  if (popupName === "addStadiums" && isOpen === true) {
    AddStadiumsForm = (
      <PopupLayout>
        <AddStadiumDetails />
      </PopupLayout>
    );
  }

  let EditStadiumsForm = null;
  if (popupName === "editStadiums" && isOpen === true) {
    EditStadiumsForm = (
      <PopupLayout>
        <EditStadiumDetails />
      </PopupLayout>
    );
  }

  return (
    <>
    {AddStadiumsForm}
    {EditStadiumsForm}
      <PageLayout title="Stadium Details" {...rest}>
        <div className={classes.pageContainer}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ສະໜາມຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <Box mt={3}>
            <Toolbar />
            {stadiumsSuccess === true && <StadiumsTable />}
            {stadiumsSuccess === false && <ShowEmptyStadiumDetails />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
};

export default ShowStadiumDetails;
