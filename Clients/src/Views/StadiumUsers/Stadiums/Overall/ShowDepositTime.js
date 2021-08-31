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
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    // backgroundColor: colors.green[600],
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

const ShowDepositTime = React.memo(({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h4">
              ໄລຍະຈ່າຍຄ່າມັດຈຳ
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {`${data.time_cancelbooking} ຊົ່ວໂມງ`}
            </Typography>
          </Box>
          <Box>
            <Avatar className={classes.avatar}>
              <AlarmIcon />
            </Avatar>
          </Box>
        </Box>
        {/* <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            1.000 ຄົນ
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            ຕັ້ງແຕ່ 1 ເດືອນຜ່ານມາ
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
});

ShowDepositTime.propTypes = {
  className: PropTypes.string,
};

export default ShowDepositTime;
