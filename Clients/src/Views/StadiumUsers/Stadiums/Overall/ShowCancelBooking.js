import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Cancel from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    // backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const ShowCancelBooking = React.memo(({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h4">
              ຍົກເລີກການຈອງ
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {`${data.time_cancelbooking} ຊົ່ວໂມງ`}
            </Typography>
          </Box>
          <Box>
            <Avatar className={classes.avatar}>
              <Cancel />
            </Avatar>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

ShowCancelBooking.propTypes = {
  className: PropTypes.string,
};

export default ShowCancelBooking;
