import React, { useState } from "react";
import { tabRoutesData } from "./TabRoutesData";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography, Divider } from "@material-ui/core";
import PageLayout from "../../../Components/PageLayout";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  },
  tab: {
    width: "140px",
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const StadiumDetails = ({...rest}) => {
  const classes = useStyles();
  const { stadiumName } = useParams();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <PageLayout title={`PK-SPORT | ${stadiumName}`} {...rest}>
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
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        </AppBar>
      </div>
      <Switch>
        <Route path={`/stadium/${stadiumName}/order`}>
          <h3>haha</h3>
        </Route>
        <Route path={`/stadium/${stadiumName}/post`}>
          <h3>post</h3>
        </Route>
        <Route path="/statdium">
          <Redirect to={`/stadium/${stadiumName}/order`} />
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default StadiumDetails;
