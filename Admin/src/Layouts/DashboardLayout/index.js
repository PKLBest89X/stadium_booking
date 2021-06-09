import React, { useState, useEffect } from "react";
import Navbar from './NavbarComponent';
import Sidebar from './SidebarComponent'
import RoutesComponents from "../../Routes";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import {
  onSmUpOpen,
  onSmUpClose,
  onSmDownClose,
} from "../../Slices/Features/ToggleDrawer/toggleSlice";

const marginMainContainer = 64;
const useStyles = makeStyles((theme) => ({
  pageStyles: {
    minHeight: "100%",
    // transition: '400ms ease-in-out',
    [theme.breakpoints.up("lg")]: {
      marginLeft: 250,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: marginMainContainer,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: 0,
    },
  },

  pageOpenTranslate: {
    marginLeft: 250,
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: 0,
    },
  },
  pageCloseTranslate: {
    marginLeft: marginMainContainer,
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: 0,
    },
  },
}));

const DashboardLayout = React.memo(() => {
  const classes = useStyles();
  const { smUp } = useShallowEqualSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const matchSm = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "sm")
  );
  const matchMd = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "md")
  );
  const matchLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));


  useEffect(() => {
    if (matchSm === true) {
      dispatch(onSmUpClose());
      dispatch(onSmDownClose());
    }
  }, [matchSm, dispatch]);

  useEffect(() => {
    if (matchMd === true) {
      dispatch(onSmUpClose());
      dispatch(onSmDownClose());
    }
  }, [matchMd, dispatch]);

  useEffect(() => {
    if (matchLg === true) {
      dispatch(onSmUpOpen(true));
    }
  }, [matchLg, dispatch]);
  return (
    <>
      <>
        <Navbar />
        <Sidebar />
        <RoutesComponents
          className={clsx(classes.pageStyles, {
            [classes.pageOpenTranslate]: smUp,
            [classes.pageCloseTranslate]: !smUp,
          })}
        />
      </>
    </>
  );
});

export default DashboardLayout;
