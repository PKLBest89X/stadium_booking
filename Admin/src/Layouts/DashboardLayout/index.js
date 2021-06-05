import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RoutesComponents from "../../Routes";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const DashboardLayout = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    nameState: "left",
    visible: false,
  });
  const [open1, setOpen1] = useState({
    visible: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState((prev) => {
      return { ...prev, nameState: anchor, visible: open };
    });
  };

  const handleOpen1 = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen1((prev) => {
      return { ...prev, visible: open };
    });
  };

  const matchSm = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "sm")
  );
  const matchMd = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "md")
  );
  const matchLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    if (matchSm === true) {
      setOpen1((previous) => {
        return { ...previous, visible: false };
      });
      setState((previous) => {
        return { ...previous, visible: false };
      });
    }
  }, [matchSm]);

  useEffect(() => {
    if (matchMd === true) {
      setOpen1((prev) => {
        return { ...prev, visible: false };
      });
      setState((previous) => {
        return { ...previous, visible: false };
      });
    }
  }, [matchMd]);

  useEffect(() => {
    if (matchLg === true) {
      setOpen1((prev) => {
        return { ...prev, visible: true };
      });
    }
  }, [matchLg]);
  return (
    <>
      <>
        <Navbar
          throwstate={state}
          toggleclicked={toggleDrawer}
          toggleclicked1={handleOpen1}
          throwstate1={open1}
        />
        <Sidebar
          getstate={state}
          toggleclicked={toggleDrawer}
          getstate1={open1}
        />
        <RoutesComponents
          className={clsx(classes.pageStyles, {
            [classes.pageOpenTranslate]: open1.visible,
            [classes.pageCloseTranslate]: !open1.visible,
          })}
        />
      </>
    </>
  );
};

export default DashboardLayout;
