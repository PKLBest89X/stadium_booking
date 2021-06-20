import React, { useEffect, useState } from "react";
import { tabRoutesData } from "./TabRoutesData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography, Divider, AppBar, Tabs, Tab } from "@material-ui/core";
import PageLayout from "../../../Components/PageLayout";
import RoutesChildComponentsUser from '../../../Routes/RoutesChildComponentsUser';
import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { userNow } from '../../../Slices/Authentication/authSlice';
import { useDispatch } from "react-redux";

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


const StadiumDetails = ({...rest}) => {
  const classes = useStyles();
  const { stadiumId } = useParams();
  let history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabChange = (payload) => setValue(payload)

  useEffect(() => {
    const pathName = ['/', '/posts', '/information', '/stadium-booking'];
    if (window.location.href.match(pathName[0])) setValue(0)
    if (window.location.href.match(pathName[1])) setValue(1)
    if (window.location.href.match(pathName[2])) setValue(2)
    if (window.location.href.match(pathName[3])) setValue(3)
  }, [])

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem('accessUserToken'))
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token))
      dispatch(userNow('userLoggedIn'))
    } else {
      dispatch(userNow('quest'));
    }
    
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCheckStadium(stadiumId_Admin));
  // }, [dispatch, stadiumId_Admin]);

  // useEffect(() => {
  //   if (checkResult === 404) {
  //     history.replace('/404')
  //   }
  // }, [history, checkResult]);

  return (
    <PageLayout title={`PK-SPORT | ${stadiumId}`} {...rest}>
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
      <RoutesChildComponentsUser tabChange={tabChange}/>
    </PageLayout>
  );
};

export default StadiumDetails;
