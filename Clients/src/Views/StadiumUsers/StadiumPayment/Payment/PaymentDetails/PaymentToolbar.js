import React, { useCallback } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Toolbar, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import Cancel from "@material-ui/icons/Cancel";
import Refresh from "@material-ui/icons/Refresh";
import PropTypes from "prop-types";
import { useRouteMatch, useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search'

import { useDispatch } from "react-redux";
import moment from "moment";
import { onDeleteSelectedPaymentData } from "../../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const PaymentToolbar = React.memo((props) => {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { numSelected, dataForDelete } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} ລາຍການ
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h5"
          id="tableTitle"
          component="div"
          color="textSecondary"
        >
          ລາຍການຊຳລະຄ່າເດີ່ນ
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(onDeleteSelectedPaymentData(dataForDelete))}
          >
            <Cancel />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="ເພີ່ມລາຍການຈອງ">
          <IconButton
            onClick={() => history.goBack()}
            color="primary"
            variant="contained"
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
});

PaymentToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default PaymentToolbar;
