import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { onSmDownClose } from "../../../Slices/Features/ToggleDrawer/toggleSlice";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { sidebarUserData, sidebarUserData2 } from "../data/sidebarUserData";
import { useHistory } from "react-router-dom";
import Footer from "../Footer";
import clsx from "clsx";
import {
  ListItemIcon,
  Divider,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  displayRoot: {
    display: "block",
  },
  hideRoot: {
    display: "none",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    color: "black",
    alignItems: "center",
  },
  linkActive: {
    backgroundColor: "rgba(0, 0, 0, .2)",
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

  onContainerOpen: {
    display: "block",
  },

  onContainerClose: {
    display: "none",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "block",
    },
  },

  overflow_content: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: "-8px",
  },
  loginFirstContainer: {
    padding: "20px",
    flex: 1,
  },
  goToLoginFirst: {
    flex: 1,
    "& > Button": {
      border: "1px solid black",
      marginTop: '.5em'
    },
    "& > p": {
      width: "100%",
      marginBottom: '.5em',
      overflowWrap: "break-word",
      wordWrap: "break-word",
      wordBreak: "break-all",
      whiteSpace: 'normal'
    },
  },
}));

const ListUser = React.memo(({ userLoggedIn }) => {
  const classes = useStyles();
  const { user } = useShallowEqualSelector((state) => state.auth);
  const { smUp } = useShallowEqualSelector((state) => state.toggle);
  const history = useHistory();
  const dispatch = useDispatch();
  const onToggleClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(onSmDownClose());
  };
  return (
    <div
      className={clsx({
        [classes.displayRoot]: user === "userLoggedIn" || user === "quest",
        [classes.hideRoot]: user === "admin",
      })}
    >
      {user === "userLoggedIn" || user === "quest" ? (
        <div className={classes.content_wrapper}>
          <div className={classes.overflow_container}>
            <List>
              {sidebarUserData.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    className={classes.link}
                    activeClassName={classes.linkActive}
                    to={item.path}
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

              {user === "quest" ? (
                <div className={classes.loginFirstContainer}>
                  <div className={classes.goToLoginFirst}>
                    <p>
                      ລົງທະບຽນເຂົ້າສູ່ລະບົບຈຶ່ງສາມາດຕິດຕາມເດີ່ນທີ່ທ່ານມັກໄດ້
                    </p>
                    <Button startIcon={<AccountCircle />} onClick={() => history.push("/login")}>
                      ເຂົ້າສູ່ລະບົບ
                    </Button>
                  </div>
                </div>
              ) : (
                <List>
                  <div className="subscribe-container">
                    <ListSubheader
                      className={clsx(classes.icon)}
                      disableSticky={true}
                    >
                      {`ຕິດຕາມເດີ່ນ`}
                    </ListSubheader>
                    {sidebarUserData2.map((item, index) => {
                      return (
                        <NavLink
                          key={index}
                          className={classes.link}
                          onClick={onToggleClose}
                          onKeyDown={onToggleClose}
                          to={item.path}
                          exact
                        >
                          <ListItem button>
                            <ListItemIcon className={classes.icon}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                              <Typography className={classes.fontEdit} noWrap>
                                {item.title}
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        </NavLink>
                      );
                    })}
                  </div>
                </List>
              )}

              <Divider />
              <Footer />
              <Divider />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default ListUser;
