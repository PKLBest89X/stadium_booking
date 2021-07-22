import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { onPopupClose } from "../Slices/Features/Popup/popupSlice";
import { useDispatch } from "react-redux";
import { IconButton, AppBar } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import { useSpring, animated, useTransition, config } from "react-spring";
import { useShallowEqualSelector } from "./useShallowEqualSelector";
import Error from "@material-ui/icons/Error";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 10,
  },

  errorIcon: {
    marginLeft: "1rem",
    marginRight: '1rem'
  },

  formLayout: {
    flex: "1 1 auto",
    maxWidth: "600px",
    position: "relative",
    margin: "1rem",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
  appbarTop: {
    zIndex: 11,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "54px",
    position: "absolute",
    top: 0,
    left: 0,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  formWrapper: {
    position: "relative",
    height: "100%",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: "54px",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 auto",
    overflow: "hidden",
  },

  content: {
    flex: "1 1 auto",
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "0px solid slategrey",
    },
    padding: "2rem",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
}));

const NotificationAlert = forwardRef(
  ({ children, notiTitle, ...rest }, ref) => {
    const classes = useStyles();
    const modalRef = useRef();
    const { isOpen } = useShallowEqualSelector((state) => state.popup);
    const dispatch = useDispatch();
    const transitions = useTransition(isOpen, {
      from: { opacity: 0, transform: `translateY(-100%)` },
      enter: { opacity: 1, transform: `translateY(0%)` },
      leave: { opacity: 0, transform: `translateY(-100%)` },
    });

    useEffect(() => {
      let val;
      val = setTimeout(() => dispatch(onPopupClose()), 3000);
      return () => {
        dispatch(onPopupClose());
        clearTimeout(val);
      };
    }, [dispatch]);

    const outsideCloseModal = (event) => {
      if (modalRef.current === event.target) {
        dispatch(onPopupClose());
      }
    };

    return transitions(
      (styles, item) =>
        item && (
          <div
            className={classes.root}
            {...rest}
            ref={modalRef}
            onClick={outsideCloseModal}
          >
            <animated.div
              style={styles}
              className={classes.formLayout}
              ref={ref}
            >
              <AppBar color="inherit" className={classes.appbarTop}>
                <div className={classes.toolbar}>
                  <Box display="flex">
                    <Error color="error" className={classes.errorIcon} />
                    <Typography color="textSecondary" variant="h4">
                      {notiTitle}
                    </Typography>
                  </Box>
                  <IconButton
                    color="inherit"
                    onClick={() => dispatch(onPopupClose())}
                  >
                    <Close />
                  </IconButton>
                </div>
              </AppBar>
              <div className={classes.formWrapper}>
                <div className={classes.contentContainer}>
                  <div className={classes.content}>{children}</div>
                </div>
              </div>
            </animated.div>
          </div>
        )
    );
  }
);

NotificationAlert.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default NotificationAlert;
