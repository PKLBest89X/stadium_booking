import React, { useEffect } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadiumDrink } from "../../../../middlewares/stadiumUser/fetchCRUDStadiumDrink/fetchCRUDStadiumDrink";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import PageLayout from "../../../../Components/PageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";
import StadiumDrinkTable from "./StadiumDrinkTable";
import AddStadiumDrink from "../AddStadiumDrink";
import EditStadiumDrink from "../EditStadiumDrink";
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

const StadiumDrink = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { drinkSuccess } = useShallowEqualSelector(
    (state) => state.stadiumDrink
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
    dispatch(fetchGetStadiumDrink(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyStadiumDrink = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">
        ບໍ່ມີເຄື່ອງດື່ມຂອງເດີ່ນ
      </Typography>
    </div>
  );

  let AddDrinkForm = null;
  if (popupName === "addDrink" && isOpen === true) {
    AddDrinkForm = (
      <PopupLayout>
        <AddStadiumDrink />
      </PopupLayout>
    );
  }

  let EditDrinkForm = null;
  if (popupName === "editDrink" && isOpen === true) {
    EditDrinkForm = (
      <PopupLayout>
        <EditStadiumDrink />
      </PopupLayout>
    );
  }

  return (
    <>
      {AddDrinkForm}
      {EditDrinkForm}
      <PageLayout title="Stadium Drink" {...rest}>
        <div className={classes.pageContainer}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ເຄື່ອງດື່ມຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <Box mt={3}>
            <Toolbar />
            {drinkSuccess === true && <StadiumDrinkTable />}
            {drinkSuccess === false && <ShowEmptyStadiumDrink />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
};

export default StadiumDrink;
