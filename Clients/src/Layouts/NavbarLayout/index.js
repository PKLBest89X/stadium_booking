import React, { useMemo, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";
import ToggleHandle from "./ToggleHandle";

import LogoutAdmin from "./NavbarAdmin/LogoutAdmin";

import ProfileUser from "./NavbarUser/ProfileUser";
import SearchUser from "./NavbarUser/SearchUser";

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

const NavbarLayout = () => {
  const classes = useStyles();
  const { data } = useShallowEqualSelector((state) => state.auth);
  const stateRef = useRef(data);
  useMemo(() => {
    data.forEach((items) => {
      return (stateRef.current = items);
    });
  }, [data]);
  return (
    <div>
      <AppBar className={classes.appbarTop} position="fixed">
        <div className={classes.toolbar}>
          <ToggleHandle />
          <SearchUser role={stateRef.current.role} />
          <ProfileUser userLoggedIn={stateRef.current} />
          <LogoutAdmin userLoggedIn={stateRef.current} />
        </div>
      </AppBar>
    </div>
  );
};

export default NavbarLayout;
