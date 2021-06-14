import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { onSmDownClose } from "../../../Slices/Features/ToggleDrawer/toggleSlice";
import { sidebarAdminData } from "../data/sidebarAdminData";
import { deepOrange } from "@material-ui/core/colors";
import Footer from "../Footer";
import clsx from "clsx";
import {
  Avatar,
  Box,
  ListItemIcon,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    color: "black",
    alignItems: "center",
  },
  activeLink: {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  icon: {
    marginRight: "-8px",
  },
  avatar: {
    cursor: "pointer",
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: 64,
    height: 64,
  },
  head_container: {
    backgroundColor: "#0B5AB0",
    width: "100%",
  },

  content_wrapper: {
    display: "flex",
    flex: 1,
    minHeight: "0px",
  },

  overflow_container: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.2em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
      outline: "0px solid slategrey",
    },
  },

  overflow_content: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  onContainerOpen: {
    display: "block",
  },

  onContainerClose: {
    display: "none",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "block",
    },
  },
  aboutContainer: {
    padding: "1em",
    "& > div": {
      display: "block",
      "& > :first-child": {
        paddingBottom: "1em",
      },
      "& > :last-child": {
        paddingTop: "1em",
      },
    },
  },
}));

const ListAdmin = React.memo(({ userLoggedIn }) => {
  const classes = useStyles();
  const { smUp } = useShallowEqualSelector((state) => state.toggle);
  const { user } = useShallowEqualSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onToggleClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(onSmDownClose());
  }
  return (
    <>
      {user === 'admin' ? (
        <div className={classes.content_wrapper}>
          <div className={classes.overflow_container}>
            <div
              className={clsx({
                [classes.onContainerOpen]: smUp,
                [classes.onContainerClose]: !smUp,
              })}
            >
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                p={2}
              >
                <Avatar
                  className={classes.avatar}
                  src={`/assets/images/adminsPics/adminProfile/stadiumOwner/${userLoggedIn.picture}`}
                  alt={`${userLoggedIn.su_name}`}
                  to="/account"
                />
                <Typography
                  className={classes.name}
                  color="textPrimary"
                  variant="h4"
                >
                  {userLoggedIn.su_name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {userLoggedIn.su_surname}
                </Typography>
              </Box>
            </div>

            <Divider />
            <List>
              {sidebarAdminData.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    className={classes.link}
                    activeClassName={classes.activeLink}
                    to={`/admin/stadium/${userLoggedIn.st_id}${item.path}`}
                    onClick={onToggleClose}
                    onKeyDown={onToggleClose}
                    exact
                  >
                    <ListItem button>
                      <ListItemIcon className={classes.icon}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  </NavLink>
                );
              })}
            </List>
            <div
              className={clsx({
                [classes.onContainerOpen]: smUp,
                [classes.onContainerClose]: !smUp,
              })}
            >
              <Divider />
              <Footer/>
              <Divider />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default ListAdmin;
