import React, { forwardRef } from "react";
import { Avatar, Box, Card, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const ReportContainerLayout = forwardRef(({ children }, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.cardLayout} ref={ref}>
      {children}
    </div>
  );
});

export default ReportContainerLayout;
