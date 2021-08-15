import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import NonTotalStadium from "./NonTotalStadium";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const StadiumsChart = React.memo(({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { allStadiumCountType } = useShallowEqualSelector((state) => state.allStadiums);

  const devices = [
    {
      title: "ພ້ອມໃຊ້ງານ",
      value: allStadiumCountType.available,
      icon: CheckIcon,
      color: colors.indigo[500],
    },
    {
      title: "ບໍ່ພ້ອມໃຊ້ງານ",
      value: allStadiumCountType.notAvailable,
      icon: ClearIcon,
      color: colors.red[600],
    },
  ];
  const data = {
    datasets: [
      {
        data: devices.map((items) => [items.value]),
        backgroundColor: [colors.indigo[500], colors.red[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["ພ້ອມໃຊ້ງານ", "ບໍ່ພ້ອມໃຊ້ງານ"],
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Box display="block" justifyContent="center" alignItems="center">
      <Card className={clsx(classes.root, className)} elevation={10} {...rest}>
        <CardHeader title="ພາບລວມເດີ່ນທັງໝົດ" />
        <Divider />
        <CardContent>
          {(allStadiumCountType.available > 0 || allStadiumCountType.notAvailable > 0) && (
            <Box height={300} position="relative">
              <Doughnut data={data} options={options} />
            </Box>
          )}
          {allStadiumCountType.available === 0 && allStadiumCountType.notAvailable && (
            <NonTotalStadium />
          )}
          <Box display="flex" justifyContent="center" mt={2}>
            {devices.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} p={1} textAlign="center">
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Box mt={1}>
                  <Typography style={{ color }} variant="h3">
                    {value} ເດີ່ນ
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
});

StadiumsChart.propTypes = {
  className: PropTypes.string,
};

export default StadiumsChart;
