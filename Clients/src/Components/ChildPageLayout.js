import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: "3rem",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
}))

const ChildPageLayout = forwardRef(({ children, title, ...rest }, ref) => {
  const classes = useStyles();
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div ref={ref} className={classes.pageContainer} {...rest}>
      {children}
    </div>
  );
});

ChildPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default ChildPageLayout;
