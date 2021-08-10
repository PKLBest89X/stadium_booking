import React, { useCallback, useRef, useMemo } from "react";
import { Avatar, Box, Card, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  cardLayout: {
    flex: 1,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.between("sm", "sm")]: {
      padding: "1rem 2rem",
    },
  },
  cardContainer: {
    padding: ".3rem",
    transition: "200ms ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  avatar: {
    [theme.breakpoints.down(400)]: {
      height: 60,
      width: 60,
    },
    [theme.breakpoints.between(400, 600)]: {
      height: 70,
      width: 70,
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 80,
      width: 80,
    },
    [theme.breakpoints.up("lg")]: {
      height: 90,
      width: 90,
    },
  },
}));

const AllStadiums = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stadiumId_Admin } = useParams();
  let history = useHistory();
  const { url } = useRouteMatch();

  const fakeData = [
    {
      st_name: "Saysettha Stadium",
      logo: "E3IzI-yVgAEuKyv.jpg",
      status: "ພ້ອມໃຫ້ບໍລິການ",
    },
    {
      st_name: "PKL Stadium",
      logo: "test_stadium_logo.jpg",
      status: "ພ້ອມໃຫ້ບໍລິການ",
    },
    {
      st_name: "KPS Stadium",
      logo: "KhampasongStadiumLogo.jpg",
      status: "ພ້ອມໃຫ້ບໍລິການ",
    },
    {
      st_name: "Singha Sport FC",
      logo: "singha_stadium_logo.jpg",
      status: "ບໍ່ພ້ອມໃຫ້ບໍລິການ",
    },
  ];


  return (
    <div className={classes.cardLayout}>
      {fakeData.map((items, index) => {
        return (
          <div className={classes.cardContainer} key={index}>
            <Card elevation={10}>
              <Grid container spacing={3}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Box padding={1}>
                    <Box>
                      <Avatar
                        className={classes.avatar}
                        src={`/assets/images/adminPics/stadiumPics/icons/${items.logo}`}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    height="100%"
                    padding="0 1em"
                  >
                    <Box>
                      <Typography gutterBottom variant="h4" color="textPrimary">
                        {items.st_name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                      >{`ສະຖານະ: ${items.status}`}</Typography>
                    </Box>
                    <Button
                      
                      color="primary"
                      variant="contained"
                    >
                      ລາຍລະອຽດ
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </div>
  );
});

export default AllStadiums;
