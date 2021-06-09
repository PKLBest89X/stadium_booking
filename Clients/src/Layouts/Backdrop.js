import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useShallowEqualSelector } from "../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { onSmDownClose } from "../Slices/Features/ToggleDrawer/toggleSlice";
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

const Backdrop = () => {
  const classes = useStyles();
  const { smDown } = useShallowEqualSelector((state) => state.toggle);
  const dispatch = useDispatch();
  return (
    <>
      {smDown === true ? (
        <div
          className={classes.root}
          onClick={() => dispatch(onSmDownClose())}
        ></div>
      ) : null}
    </>
  );
};

export default Backdrop;
