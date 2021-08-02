import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbarLayout: {
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#CDCDCD",
    [theme.breakpoints.up("md")]: {
      position: "sticky",
      height: "calc(100vh - 65px)",
      float: "right",
      minWidth: "40%",
    },
  },
  wrapper: {
    position: "relative",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 65px)",
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },

  content: {
    flex: "1 1 auto",
    padding: "1rem",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.3)",
      outline: "0px solid slategrey",
    },
  },
}));

const NavigationLayout = forwardRef(({ children, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.toolbarLayout} ref={ref} {...rest}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
});

export default NavigationLayout;
