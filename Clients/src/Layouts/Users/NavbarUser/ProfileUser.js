import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import {
  Button,
  Box,
  Avatar,
} from "@material-ui/core";
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

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const { data } = useShallowEqualSelector((state) => state.auth);
  return (
    <div className={classes.editToolContainer}>
      <Button
        color="inherit"
        onClick={() => {
          history.push("/admin/login");
        }}
      >
        ເດີ່ນຂອງຂ້ອຍ
      </Button>
      <div>
        {data.length > 0 ? (
          <>
            {data.slice(-1).map((items, index) => {
              return (
                <div key={index}>
                  <Box alignItems="center" display="flex" flexDirection="row">
                    <Avatar
                      className={classes.avatar}
                      src={`/assets/images/usersPics/usersProfile/${items.picture}`}
                      alt={`${items.c_name}`}
                      onClick={() => history.push("/account")}
                    />
                  </Box>
                </div>
              );
            })}
          </>
        ) : (
          <Button
            className={classes.logInButton}
            color="inherit"
            onClick={() => {
              history.push("/login");
            }}
          >
            login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
