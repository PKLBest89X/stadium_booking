import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  makeStyles,
  colors,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import NumberFormat from "react-number-format";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalProfit = React.memo(({ className, ...rest }) => {
  const classes = useStyles();
  const { countIncomeValue } = useShallowEqualSelector(
    (state) => state.countIncome
  );

  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              ລວມການຊຳລະ
            </Typography>
            <Box paddingTop="1rem">
              <NumberFormat
                value={countIncomeValue}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" ກີບ"}
                renderText={(value) => (
                  <Typography variant="h4" color="textSecondary">
                    {value}
                  </Typography>
                )}
              />
            </Box>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
