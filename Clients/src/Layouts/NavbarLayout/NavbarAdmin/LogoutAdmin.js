import React from "react";
import { adminLogOut } from "../../../Slices/Authentication/authSlice";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar, IconButton, Button } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import { deepOrange } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > :nth-child(n)": {
     
    },
    // "& > [id='btn-back']": {
    //   border: "1px solid white",
    // },
  },
  avatar: {
    cursor: "pointer",
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  displayRoot: {
    display: "block",
  },
  hideRoot: {
    display: "none",
  },
}));

const LogoutAdmin = React.memo(({ userLoggedIn }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useShallowEqualSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div
      className={clsx({
        [classes.displayRoot]: user === "admin",
        [classes.hideRoot]: user !== "admin",
      })}
    >
      {user === "admin" ? (
        <div className={classes.root}>
          <Box alignItems="center" display="flex" flexDirection="row">
            <Avatar
              className={classes.avatar}
              src={`/assets/images/adminsPics/adminProfile/stadiumOwner/${userLoggedIn.picture}`}
              alt={`${userLoggedIn.su_name}`}
              onClick={() => history.push("/admin/account")}
            />
          </Box>
          <IconButton id="btn-back" color="inherit" onClick={() => history.push("/")}>
            <ArrowBack />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(adminLogOut());
            }}
          >
            <ExitToApp />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
});

export default LogoutAdmin;
