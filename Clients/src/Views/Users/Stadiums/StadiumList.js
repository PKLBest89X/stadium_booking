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

import { useHistory, useRouteMatch, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardLayout: {
    flex: 1,
    width: "100%",
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

const BookingListUnCheckout = React.memo(({ stadiumData }) => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div className={classes.cardLayout}>
      {stadiumData.map((items, index) => {
        return (
          <div className={classes.cardContainer} key={index}>
            <Card elevation={10}>
              <Grid container spacing={3}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <div className={classes.avatarContainer}>
                    <Box>
                      <Avatar
                        className={classes.avatar}
                        src={`/assets/images/adminPics/stadiumPics/icons/${items.logo}`}
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
                        {items.st_name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                      >{`ສະໂລແກນ: ${items.description}`}</Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                      >{`ຍອດຕິດຕາມ: ${items.follow_count} ຄົນ`}</Typography>
                    </Box>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        history.push(`/stadium/${items.st_id}/stadium-booking`)
                      }
                    >
                      ຈອງ
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

export default BookingListUnCheckout;
