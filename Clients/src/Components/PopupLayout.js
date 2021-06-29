import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { onPopupClose } from "../Slices/Features/Popup/popupSlice";
import { useDispatch } from "react-redux";
import { IconButton, AppBar } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: 10,
  },
  appbarTop: {
    zIndex: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "54px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  formWrapper: {
    position: "relative",
    height: "100%",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 auto",
    overflow: "hidden",
    padding: "1rem",
  },

  content: {
    flex: "1 1 480",
    maxWidth: "600px",
    backgroundColor: "white",
    height: "70%",
    overflowY: "auto",
    boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, .3)',
    overflowX: "hidden",
    borderRadius: "5px",
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
  },
}));

const PopupLayout = forwardRef(({ children, title, ...rest }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(onPopupClose());
  }, [dispatch]);

  return (
    <div ref={ref} className={classes.root} {...rest}>
      <div className={classes.formWrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <AppBar className={classes.appbarTop} position="sticky">
              <div className={classes.toolbar}>
                <IconButton
                  color="inherit"
                  onClick={() => dispatch(onPopupClose())}
                >
                  <Close />
                </IconButton>
              </div>
            </AppBar>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

PopupLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default PopupLayout;
