import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { onSmDownClose } from "../../../Slices/Features/ToggleDrawer/toggleSlice";
import { user, sidebarAdminData } from "../sidebarAdminData";
import clsx from "clsx";
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

const ListAdmin = () => {
  const classes = useStyles();
  const { smUp, smDown } = useShallowEqualSelector((state) => state.toggle);
  const { data } = useShallowEqualSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className={classes.content_wrapper}>
      <div className={classes.overflow_container}>
        <div
          className={clsx({
            [classes.onContainerOpen]: smUp,
            [classes.onContainerClose]: !smUp,
          })}
        >
          <Box alignItems="center" display="flex" flexDirection="column" p={2}>
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
          {data.slice(-1).map((findId) => {
            return sidebarAdminData.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  className={classes.link}
                  activeClassName={classes.activeLink}
                  to={`/admin/stadium/${findId.st_id}/${item.path}`}
                  onClick={(event) => {
                    if (
                      event.type === "keydown" &&
                      (event.key === "Tab" || event.key === "Shift")
                    ) {
                      return;
                    }
                    dispatch(onSmDownClose());
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.type === "keydown" &&
                      (event.key === "Tab" || event.key === "Shift")
                    ) {
                      return;
                    }
                    dispatch(onSmDownClose());
                  }}
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
            });
          })}
        </List>
        <div
          className={clsx({
            [classes.onContainerOpen]: smUp,
            [classes.onContainerClose]: !smUp,
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
  );
};

export default ListAdmin;
