import React, { useEffect, useMemo, useRef } from "react";

import NavbarLayout from "./NavbarLayout";
import SidebarLayout from "./SidebarLayout";

import RoutesComponents from "../Routes";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useShallowEqualSelector } from "../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import {
  onSmUpOpen,
  onSmUpClose,
  onSmDownClose,
} from "../Slices/Features/ToggleDrawer/toggleSlice";

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

const MainLayout = React.memo(() => {
  const classes = useStyles();
  const { data } = useShallowEqualSelector((state) => state.auth);
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

  const stategg = useRef(data);
  useMemo(() => {
    data.forEach((items) => {
      return (stategg.current = items.role);
    });
  }, [data]);

  return (
    <>
      <NavbarLayout />
      <SidebarLayout />
      <RoutesComponents
        className={clsx(classes.pageStyles, {
          [classes.pageOpenTranslate]: smUp,
          [classes.pageCloseTranslate]: !smUp,
        })}
      />
    </>
  );
});

export default MainLayout;
