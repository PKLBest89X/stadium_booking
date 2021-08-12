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
import Place from "@material-ui/icons/Place";

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

const ShowAddress = React.memo(({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h4">
              ທີ່ຕັ້ງ
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {`${data.village}, ${data.district} - ${data.province}`}
            </Typography>
          </Box>
          <Box>
            <Avatar className={classes.avatar}>
              <Place />
            </Avatar>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

ShowAddress.propTypes = {
  className: PropTypes.string,
};

export default ShowAddress;
