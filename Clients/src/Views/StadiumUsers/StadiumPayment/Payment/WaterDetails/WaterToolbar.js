import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Toolbar, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import Cancel from "@material-ui/icons/Cancel";
import Refresh from "@material-ui/icons/Refresh";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import moment from "moment";
import { onDeleteSelectedWaterData } from "../../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import { onPopupOpen } from "../../../../../Slices/Features/Popup/popupSlice";
import { onNotiClose } from "../../../../../Slices/Features/Notification/NotificationSlice";

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

const WaterToolbar = React.memo((props) => {
  const classes = useStyles();
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
          ລາຍການເຄື່ອງດື່ມຂອງລູກຄ້າ
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(onDeleteSelectedWaterData(dataForDelete))}
          >
            <Cancel />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="ເພີ່ມລາຍການຈອງ">
          <Button
            onClick={() => {
              dispatch(onPopupOpen("addWaterPayment"));
              dispatch(onNotiClose());
            }}
            color="primary"
            variant="contained"
          >
            ເພີ່ມ
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
});

WaterToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default WaterToolbar;
