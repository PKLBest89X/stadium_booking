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
import MoneyIcon from "@material-ui/icons/Money";

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

const ShowDescription = React.memo(({ className, data, ...rest }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h4">
              ສະໂລແກນ
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {data.description}
            </Typography>
          </Box>
          <Box>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
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
            12 ຄົນ
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            ຕັ້ງແຕ່ 2 ເດືອນຜ່ານມາ
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
});

ShowDescription.propTypes = {
  className: PropTypes.string,
};

export default ShowDescription;
