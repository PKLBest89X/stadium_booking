import React from 'react';
import { onSmUpOpen, onSmDownOpen } from '../../../Slices/Features/ToggleDrawer/toggleSlice';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import clsx from "clsx";
import {
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
  menuButton: {
    marginRight: ".85em",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}))

const Logo = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { smUp, smDown } = useShallowEqualSelector(state => state.toggle);
    return (
        <div className="logo-container">
        <IconButton
          edge="start"
          className={clsx(classes.menuButton, classes.iconButton1)}
          color="inherit"
          aria-label="open drawer"
          onClick={(event) => {
            if (
              event.type === "keydown" &&
              (event.key === "Tab" || event.key === "Shift")
            ) {
              return;
            }
            dispatch(onSmDownOpen(!smDown))
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          edge="start"
          className={clsx(classes.menuButton, classes.iconButton2)}
          color="inherit"
          onClick={(event) => {
            if (
              event.type === "keydown" &&
              (event.key === "Tab" || event.key === "Shift")
            ) {
              return;
            }
            dispatch(onSmUpOpen(!smUp));
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h4" noWrap>
          PK-SPORT
        </Typography>
      </div>
    );
};

export default Logo;