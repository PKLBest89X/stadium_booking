import React, { useEffect } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchGetStadiumPrice } from "../../../../middlewares/stadiumUser/fetchCRUDStadiumPrice/fetchCRUDStadiumPrice";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import PageLayout from "../../../../Components/PageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";
import StadiumPriceTable from "./StadiumPriceTable";
import AddStadiumPrice from "../AddStadiumPrice";
import Toolbar from "./Toobar";

import { unwrapResult } from "@reduxjs/toolkit";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10rem",
    paddingBottom: '10rem',
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const StadiumPrice = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { priceSuccess } = useShallowEqualSelector((state) => state.stadiumPrice);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      const authRequest = async () => {
        const getReponse = await dispatch(fetchAuthAdmin(adminToken.token));
        const result = unwrapResult(getReponse);
        if (result.role === "staff") {
          history.replace("/401");
        }
        dispatch(userNow("admin"));
      };
      authRequest();
    }
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetStadiumPrice(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyStadiumPrice = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລາຄາຂອງເດີ່ນ
      </Typography>
    </div>
  );

  let AddStadiumPriceForm = null;
  if (popupName === "addPrice" && isOpen === true) {
    AddStadiumPriceForm = (
      <PopupLayout>
        <AddStadiumPrice />
      </PopupLayout>
    );
  }

  return (
    <>
      {AddStadiumPriceForm}
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
            {priceSuccess === true && <StadiumPriceTable />}
            {priceSuccess === false && <ShowEmptyStadiumPrice />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
});

export default StadiumPrice;
