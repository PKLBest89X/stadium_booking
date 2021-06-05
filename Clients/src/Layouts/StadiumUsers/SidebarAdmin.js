import React from "react";
import { Link, NavLink } from "react-router-dom";
import Backdrop from "../Backdrop";
import { user, sidebarAdminData } from "./sidebarAdminData";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  ListItemIcon,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Hidden,
} from "@material-ui/core";

// This is import Icon

import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  //ການ set ໃຫ້ appbar ທາງເທິງ

  //ການໃສ່ style ໃຫ້ drawer ບໍ່ໃຫ້ມີ scroll bar ແລະ set ຄວາມາສູງໃຫ້ເທົ່າ 100%
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
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
  drawerPaper: {
    overflowX: "hidden",
    overflowY: "hidden",
    height: "100%",
    // transition: '400ms ease-in-out',
    [theme.breakpoints.up("lg")]: {
      zIndex: 4,
      width: drawerWidth,
    },
    [theme.breakpoints.between("md", "md")]: {
      zIndex: 4,
      width: 64,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: 250,
    },
    whiteSpace: "noWrap",
  },
  icon: {
    marginRight: '-8px'
  },

  main_container: {
    height: "calc(100%)",
    display: "flex",
    flexDirection: "column",
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    width: 64,
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

const SidebarAdmin = ({ getstate, toggleclicked, getstate1 }) => {
  const classes = useStyles();

  // ພາກສ່ວນຂອງ sidebar
  const list = (anchor) => (
    <div className={classes.main_container} role="presentation">
      <div>
        <ListItem>
          <Link className={classes.link} to="#">
            <ListItemIcon className={classes.icon}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleclicked(anchor.nameState, false)}
                onKeyDown={toggleclicked(anchor.nameState, false)}
              >
                {<MenuIcon />}
              </IconButton>
            </ListItemIcon>
            <Typography className={classes.title} variant="h6" noWrap>
              PK-SPORT
            </Typography>
          </Link>
        </ListItem>
      </div>

      <Divider />

      <div className={classes.content_wrapper}>
        <div className={classes.overflow_container}>
          <div
            className={clsx({
              [classes.onContainerOpen]: getstate1.visible,
              [classes.onContainerClose]: !getstate1.visible,
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
                src={user.avatar}
                to="/account"
              />
              <Typography
                className={classes.name}
                color="textPrimary"
                variant="h5"
              >
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {user.jobTitle}
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
                  to={item.path}
                  onClick={toggleclicked(anchor.nameState, false)}
                  onKeyDown={toggleclicked(anchor.nameState, false)}
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
              [classes.onContainerOpen]: getstate1.visible,
              [classes.onContainerClose]: !getstate1.visible,
            })}
          >
            <Divider />
            <div className={classes.aboutContainer}>
              <div className={classes.aboutContent}>
                <p>
                  <span>ໂຄງການບົດຈົບຊັ້ນໂດຍ</span>
                </p>
                <p>
                  <span>ທ້າວ. ພູມມີໄຊ ຂຸນທິກຸມມານ</span>
                </p>
                <p>
                  <span>ທ້າວ. ເກດສະດາພອນ ວິຍະວົງ</span>
                </p>
                <p>
                  <span>ສົກຮຽນ 2020 - 2021</span>
                </p>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.grow}>
      <div>
        {getstate.visible && (
          <Backdrop show={getstate} clicked={toggleclicked("left", false)} />
        )}
        <Hidden mdUp implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="persistent"
            anchor="left"
            open={getstate.visible}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            onClose={toggleclicked("left", false)}
          >
            {list(getstate)}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={clsx(classes.main_container, {
              [classes.drawerOpen]: getstate1.visible,
              [classes.drawerClose]: !getstate1.visible,
            })}
            classes={{
              paper: clsx(classes.drawerPaper, {
                [classes.drawerOpen]: getstate1.visible,
                [classes.drawerClose]: !getstate1.visible,
              }),
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            variant="permanent"
          >
            {list(getstate)}
          </Drawer>
        </Hidden>
      </div>
    </div>
  );
};

export default SidebarAdmin;
