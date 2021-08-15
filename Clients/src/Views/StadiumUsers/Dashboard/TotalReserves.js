import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

const TotalReserves = React.memo(({ className, ...rest }) => {
  const classes = useStyles();
  const { countBookingNumber } = useShallowEqualSelector(
    (state) => state.countBooking
  );

  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              ການຈອງທັງໝົດ
            </Typography>
            <Box paddingTop="1rem">
              <Typography color="textSecondary" variant="h3">
                {`${countBookingNumber} ລາຍການ`}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </Card>
  );
});

TotalReserves.propTypes = {
  className: PropTypes.string,
};

export default TotalReserves;
