import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { onSmDownClose } from '../../../Slices/Features/ToggleDrawer/toggleSlice';
import { useDispatch } from 'react-redux';
import {
  ListItemIcon,
  ListItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    color: "black",
    alignItems: "center",
  },
  icon: {
    marginRight: '-8px'
  },
}))

const HeaderAdmin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
    return (
        <div className="header">
        <ListItem>
          <Link className={classes.link} to="#">
            <ListItemIcon className={classes.icon}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={(event) => {
                  if (
                    event.type === "keydown" &&
                    (event.key === "Tab" || event.key === "Shift")
                  ) {
                    return;
                  }
                  dispatch(onSmDownClose())
                }}
                onKeyDown={(event) => {
                  if (
                    event.type === "keydown" &&
                    (event.key === "Tab" || event.key === "Shift")
                  ) {
                    return;
                  }
                  dispatch(onSmDownClose())
                }}
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
    );
};

export default HeaderAdmin;