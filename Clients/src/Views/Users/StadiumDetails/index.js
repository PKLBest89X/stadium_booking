import React, { useEffect, useState, useMemo, useRef } from "react";
import { tabRoutesData } from "./TabRoutesData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Typography,
  Divider,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import PageLayout from "../../../Components/PageLayout";
import RoutesChildComponentsUser from "../../../Routes/RoutesChildComponentsUser";
import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { fetchCheckStadium } from "../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { fetchGetStadiumForUser } from "../../../middlewares/user/fetchStadium/fetchStadium";
import { fetchGetSubscribeByStadiumId } from "../../../middlewares/user/fetchSubscribe/fetchSubscribe";
import SubscribeTool from "./SubScribeTool";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  introduceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em 3em",
    [theme.breakpoints.down("xs")]: {
      padding: "1em 1em",
    },
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
    width: 80,
    height: 80,
    boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, .5)",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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

const StadiumDetails = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { stadiumId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { feedStadiumData } = useShallowEqualSelector(
    (state) => state.feedStadium
  );
  const stateRef = useRef(feedStadiumData);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabChange = (payload) => setValue(payload);

  useEffect(() => {
    const pathName = ["/", "/posts", "/information", "/stadium-booking"];
    if (window.location.href.match(pathName[0])) setValue(0);
    if (window.location.href.match(pathName[1])) setValue(1);
    if (window.location.href.match(pathName[2])) setValue(2);
    if (window.location.href.match(pathName[3])) setValue(3);
  }, []);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetStadiumForUser(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      const subRequestData = {
        stadiumId,
        token: userToken.token,
      };
      dispatch(fetchGetSubscribeByStadiumId(subRequestData));
    }
  }, [dispatch, stadiumId]);

  useMemo(
    () => feedStadiumData.forEach((items) => (stateRef.current = items)),
    [feedStadiumData]
  );

  return (
    <PageLayout title={`PK-SPORT | Stadium`} {...rest}>
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
      <div>
        <div className={classes.introduceContainer}>
          <Box display="flex" alignItems="center">
            <Avatar
              className={classes.avatar}
              src={`/assets/images/adminPics/stadiumPics/icons/${stateRef.current.logo}`}
              alt="ຮູບ logo ຂອງເດີ່ນ"
            />
            <Box marginLeft="1em">
              <Typography
                className={classes.name}
                color="textPrimary"
                variant="h3"
              >
                {stateRef.current.st_name}
              </Typography>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                {stateRef.current.description}
              </Typography>
            </Box>
          </Box>
          <SubscribeTool feedStadium={stateRef.current}/>
        </div>
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
      <RoutesChildComponentsUser tabChange={tabChange} />
    </PageLayout>
  );
});

export default StadiumDetails;
