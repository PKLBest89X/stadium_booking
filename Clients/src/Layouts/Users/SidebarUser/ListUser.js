import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { onSmDownClose } from "../../../Slices/Features/ToggleDrawer/toggleSlice";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { sidebarUserData, sidebarUserData2 } from "../sidebarUserData";
import clsx from "clsx";
import {
  ListItemIcon,
  Divider,
  ListSubheader,
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

const ListUser = () => {
  const classes = useStyles();
  const { smUp } = useShallowEqualSelector((state) => state.toggle);
  const dispatch = useDispatch();
  return (
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
          })}
        </List>
        <div
          className={clsx({
            [classes.onContainerOpen]: smUp,
            [classes.onContainerClose]: !smUp,
          })}
        >
          <Divider />
          <List>
            <div className="subscribe-container">
              <ListSubheader
                className={clsx(classes.icon)}
                disableSticky={true}
              >{`ຕິດຕາມເດີ່ນ`}</ListSubheader>
              {sidebarUserData2.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    className={classes.link}
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

export default ListUser;
