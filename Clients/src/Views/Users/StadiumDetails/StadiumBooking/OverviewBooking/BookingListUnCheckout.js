import React, { useCallback, useRef, useMemo } from "react";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  cardLayout: {
    flex: 1,
    width: "100%",
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
  avatarContainer: {
    display: "flex",
    padding: ".5rem",
    justifyContent: "flex-start",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
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

const BookingListUnCheckout = React.memo(({ bookingBillData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg">
      {bookingBillData.map((items, index) => {
        return (
          <div className={classes.cardContainer} key={index}>
            <Card elevation={10}>
              <Grid container spacing={3}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <div className={classes.avatarContainer}>
                    <Box>
                      <Avatar
                        className={classes.avatar}
                        src={`/assets/images/userPics/usersProfile/${items.profile}`}
                      />
                    </Box>
                  </div>
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
                        {items.c_name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                      >{`ຈອງ: ${items.td_start.slice(0, 5)} ໂມງ - ${items.td_end.slice(0, 5)} ໂມງ`}</Typography>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      color="textSecondary"
                      noWrap
                    >
                      {items.std_name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </Container>
  );
});

export default BookingListUnCheckout;
