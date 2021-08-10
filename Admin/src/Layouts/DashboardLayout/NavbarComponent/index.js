import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { superAdminLogOut } from '../../../Slices/Authentication/authSlice';
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import ExitToApp from "@material-ui/icons/ExitToApp";

import Logo from "./Logo";

import { Button, AppBar, IconButton, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appbarTop: {
    zIndex: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "65px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0 1em",

    "& > :first-child": {
      display: "flex",
      alignItems: "center",
    },

    "& > :last-child": {
      "& > button": {
        
      },
    },
  },
  iconButton: {
    padding: 1,
    color: "white",
  },

  icon: {
    marginLeft: "8px",
  },
  grow: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { smUp, smDown } = useShallowEqualSelector((state) => state.toggle);
  const dispatch = useDispatch();
  return (
    <div>
      <AppBar className={classes.appbarTop} position="fixed">
        <div className={classes.toolbar}>
          <Logo />

          <div className="login-container">
            <IconButton
              color="inherit"
              onClick={() => {
                dispatch(superAdminLogOut());
              }}
            >
              <ExitToApp />
            </IconButton>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Navbar;
