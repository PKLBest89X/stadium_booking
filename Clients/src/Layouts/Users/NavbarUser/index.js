import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import LogoUser from "./LogoUser";
import ProfileUser from "./ProfileUser";
import SearchUser from "./SearchUser";

import { AppBar } from "@material-ui/core";

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
    "& > :nth-child(2)": {
      flex: 1,
      maxWidth: 600,
      padding: "0 1em",
    },

    "& > :last-child": {
      "& > button": {
        border: "1px solid #f3f3f3",
      },
    },
  },

  icon: {
    marginLeft: "8px",
  },
  grow: {
    flexGrow: 1,
  },

  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const NavbarUser = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appbarTop} position="fixed">
        <div className={classes.toolbar}>
          <LogoUser />
          <SearchUser />
          <ProfileUser />
        </div>
      </AppBar>
    </div>
  );
};

export default NavbarUser;
