import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(() => ({
  componentContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: "100px",
    paddingBottom: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bookingIcon: {
    width: "100px",
    height: "100px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "& > :first-child": {
      marginTop: "1rem",
      marginBottom: ".5rem",
    },
    "& > :last-child": {
      marginTop: ".5rem",
      marginBottom: "1rem",
    },
  },
}));

const NonStadium = () => {
  const classes = useStyles();
  let history = useHistory();

  const onPushToBookingHistory = () => {
    history.push("/booking-history");
  };
  return (
    <div className={classes.componentContainer}>  
      <div className={classes.contentContainer}>
        <InfoIcon className={classes.bookingIcon} />
        <div className={classes.textContainer}>
          <Typography variant="h3" color="textSecondary">
            ບໍ່ມີສະໜາມ!!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NonStadium;
