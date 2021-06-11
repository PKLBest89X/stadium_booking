import React from "react";
import { Button } from "@material-ui/core";
import { adminLogOut } from "../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  displayRoot: {
    display: 'block'
  },
  hideRoot: {
    display: 'none'
  }
}))


const LogoutAdmin = React.memo(({ role }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={clsx({
      [classes.displayRoot]: role === 'manager',
      [classes.hideRoot]: role !== 'manager'
    })}>
      {role === "manager" ? (
        <>
          <Button color="inherit" onClick={() => {dispatch(adminLogOut())}}>
            log out
          </Button>
        </>
      ) : null}
    </div>
  );
});

export default LogoutAdmin;
