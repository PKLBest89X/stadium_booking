import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { Button, Box, Avatar } from "@material-ui/core";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: "pointer",
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  editToolContainer: {
    display: "flex",
    "& > :nth-child(n)": {
      margin: "0 .35em",
    },
  },
  logInButton: {
    border: "1px solid white",
  },
}));

const ProfileUser = React.memo(({ userLoggedIn }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useShallowEqualSelector((state) => state.auth);
  return (
    <div className={classes.editToolContainer}>
      {userLoggedIn.role === "user" || user === "quest" ? (
        <>
          <Button
            className={classes.logInButton}
            color="inherit"
            onClick={() => {
              history.push("/admin/login");
            }}
            startIcon={<SportsSoccerIcon />}
          >
            ເດີ່ນຂອງຂ້ອຍ
          </Button>
          {user === "userLoggedIn" ? (
            <Box alignItems="center" display="flex" flexDirection="row">
              <Avatar
                className={classes.avatar}
                src={`/assets/images/usersPics/usersProfile/${userLoggedIn.picture}`}
                alt={`${userLoggedIn.c_name}`}
                onClick={() => history.push("/account")}
              />
            </Box>
          ) : (
            <Button
              className={classes.logInButton}
              color="inherit"
              onClick={() => {
                history.push("/login");
              }}
              startIcon={<AccountCircle />}
            >
              ເຂົ້າສູ່ລະບົບ
            </Button>
          )}
        </>
      ) : null}
    </div>
  );
});

export default ProfileUser;
