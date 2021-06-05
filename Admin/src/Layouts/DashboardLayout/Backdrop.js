import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "fixed",
    display: "block",
    top: 0,
    left: 0,
    zIndex: 5,
    backgroundColor: "rgba(0, 0, 0, .5)",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Backdrop = ({ show, clicked, ...rest }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div {...rest}>
        {show.nameState === "left" && show.visible === true ? (
          <div className={classes.root} onClick={clicked}></div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Backdrop;
