import React, { useEffect, useState } from "react";
import PageLayout from "../../../Components/PageLayout";
import { fetchCheckStadium } from '../../../middlewares/fetchCheckValidData/fetchCheckValidData';
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography, Divider, AppBar, Tabs, Tab } from "@material-ui/core";
import { tabRoutesData } from './tabRoutesData'
import RoutesChildComponentsAdmin from '../../../Routes/RoutesChildComponentsAdmin';


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
    height: "auto",
    maxHeight: '300px',
    objectFit: 'cover',
    objectPosition: 'center',
    aspectRatio: '16/9'
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  appBar: {
    position: "sticky",
    top: 0,
    zIndex: 4
  },
  tab: {
    width: "140px",
  },
}));



const StadiumsView = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumId_Admin } = useParams();
  let history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabChange = (payload) => setValue(payload)

  useEffect(() => {
    const pathName = ['/manage', '/manage/stadium-details', '/manage/stadium-price', '/manage/stadium-drink'];
    if (window.location.href.match(pathName[0])) setValue(0)
    if (window.location.href.match(pathName[1])) setValue(1)
    if (window.location.href.match(pathName[2])) setValue(2)
    if (window.location.href.match(pathName[3])) setValue(3)
  }, [])

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
    <PageLayout title="statdium" {...rest}>
      <div className={classes.root}>
        <div className={classes.pictureContainer}>
          <img className={classes.pictureProperties} src='/assets/picture/test1.jpg' alt="ຮູບ logo ຂອງເດີ່ນ" />
        </div>
      </div>
      <Divider />
      <div>
        <Box alignItems="center" display="flex" flexDirection="row" p={2}>
          <Avatar className={classes.avatar} to="/account" />
          <Typography
            className={classes.name}
            color="textPrimary"
            variant="h5"
          ></Typography>
          <Typography color="textSecondary" variant="body2"></Typography>
        </Box>
      </div>
      <Divider />
      <div className={classes.appBar}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            {tabRoutesData.map((items, index) => {
              return (
                <Tab
                  className={classes.tab}
                  key={index}
                  label={items.title}
                  icon={items.icon}
                  onClick={() => history.push(`${url}${items.path}`)}
                />
              );
            })}
          </Tabs>
        </AppBar>
      </div>
      <RoutesChildComponentsAdmin tabChange={tabChange}/>
    </PageLayout>
  );
};

export default StadiumsView;
