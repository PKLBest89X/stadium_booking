import React, { useEffect, useState, useMemo, useRef } from "react";
import PageLayout from "../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadium } from "../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Overall from './Overall'

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  pictureContainer: {
    display: "flex",
    width: "100%",
  },
  pictureProperties: {
    display: "block",
    width: "100%",
    height: "calc(100vw / 5 - 1px)",
    position: "relative",
    objectFit: "cover",
    objectPosition: "center center",
    aspectRatio: "16/9",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  appBar: {
    position: "sticky",
    top: 0,
    zIndex: 4,
  },
  tab: {
    width: "140px",
  },
}));

const StadiumsView = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumData } = useShallowEqualSelector((state) => state.stadium);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const stateRef = useRef(stadiumData);
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
    dispatch(fetchGetStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useMemo(
    () => stadiumData.forEach((items) => (stateRef.current = items)),
    [stadiumData]
  );

  return (
    <PageLayout title="statdium" {...rest}>
      <div className={classes.root}>
        <div className={classes.pictureContainer}>
          <img
            className={classes.pictureProperties}
            src={`/assets/images/adminPics/stadiumPics/themeBackground/${stateRef.current.picture}`}
            alt="ຮູບ logo ຂອງເດີ່ນ"
          />
        </div>
      </div>
      <Divider />
      <Overall />
    </PageLayout>
  );
};

export default StadiumsView;
