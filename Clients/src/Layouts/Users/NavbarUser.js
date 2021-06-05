import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import {
  InputBase,
  Paper,
  Button,
  AppBar,
  IconButton,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  iconButton1: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  iconButton2: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
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
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
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
  menuButton: {
    marginRight: ".85em",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  editToolContainer: {
    '& > Button': {
      margin: '0 .35em'
    }
  }
}));

const NavbarUser = ({ throwstate, toggleclicked, toggleclicked1, throwstate1 }) => {
  const classes = useStyles();
  let history = useHistory();
  const OnOpenUserLogin = () => {
    history.push("/login");
  };

  const OnOpenAdminLogin = () => {
    history.push("/admin/login");
  };
  return (
    <div>
      <AppBar className={classes.appbarTop} position="fixed">
        <div className={classes.toolbar}>
          <div className="logo-container">
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, classes.iconButton1)}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleclicked(throwstate.nameState, true)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, classes.iconButton2)}
              color="inherit"
              onClick={toggleclicked1(!throwstate1.visible)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              PK-SPORT
            </Typography>
          </div>

          <div className="search-container">
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="ຄົ້ນຫາເດີ່ນ..."
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>

          <div className={classes.editToolContainer}>
            <Button color="inherit" onClick={OnOpenAdminLogin}>
              ເດີ່ນຂອງຂ້ອຍ
            </Button>
            <Button color="inherit" onClick={OnOpenUserLogin}>
              login
            </Button>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default NavbarUser;
