import React from "react";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { onSmDownClose } from "../../../Slices/Features/ToggleDrawer/toggleSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    color: "black",
    alignItems: "center",
  },
  emptyView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  icon: {
    marginRight: "-8px",
  },
  avatar: {
    cursor: "pointer",
    height: 26,
    width: 26,
    boxShadow: '1px 1px 3px 1px rgba(0,0,0,.5)'
  },
}));

const ListSubScribe = React.memo(() => {
  const classes = useStyles();
  const { subscribeData, subscribeSuccess } = useShallowEqualSelector(
    (state) => state.subscribe
  );
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

  const ShowEmptySubscribe = () => (
    <div className={classes.emptyView}>
      <Typography variant="h5" color="textSecondary">ບໍ່ໄດ້ມີການຕິດຕາມເດີ່ນ</Typography>
    </div>
  );

  const ShowSubscribeStadium = subscribeData.map((items) => {
    return (
      <NavLink
        key={items.st_id}
        className={classes.link}
        onClick={onToggleClose}
        onKeyDown={onToggleClose}
        to={`/stadium/${items.st_id}`}
        exact
      >
        <ListItem button>
          <ListItemIcon className={classes.icon}>
            <Avatar
              className={classes.avatar}
              src={`/assets/images/adminPics/stadiumPics/icons/${items.logo}`}
              alt={items.st_name}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography noWrap>{items.st_name}</Typography>
          </ListItemText>
        </ListItem>
      </NavLink>
    );
  });

  return (
    <>
      {subscribeSuccess === true && <>{ShowSubscribeStadium}</>}
      {subscribeSuccess === false && <ShowEmptySubscribe />}
    </>
  );
});

export default ListSubScribe;
