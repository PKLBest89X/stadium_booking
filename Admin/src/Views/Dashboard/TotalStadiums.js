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
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
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

const TotalStadiums = React.memo(({ className, ...rest }) => {
  const classes = useStyles();
  const { allStadiumCount } = useShallowEqualSelector(
    (state) => state.allStadiums
  );
  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              ເດີ່ນທັງໝົດ
            </Typography>
            <Box paddingTop="1rem">
              <Typography color="textSecondary" variant="h3">
                {`${allStadiumCount} ເດີ່ນ`}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SportsSoccerIcon />
            </Avatar>
          </Grid>
        </Grid>
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

TotalStadiums.propTypes = {
  className: PropTypes.string,
};

export default TotalStadiums;
