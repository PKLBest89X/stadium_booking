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
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIcon from "@material-ui/icons/Phone";
import TabletIcon from "@material-ui/icons/Tablet";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const ReserveByCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const devices = [
    {
      title: "ຈອງຜ່ານເວັບໄຊ",
      value: 2,
      icon: LaptopMacIcon,
      color: colors.indigo[500],
    },
    {
      title: "ໂທຈອງ",
      value: 2,
      icon: TabletIcon,
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
    labels: ["ຈອງຜ່ານເວັບໄຊ", "ໂທຈອງ"],
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
        <CardHeader title="ການຈອງຂອງເດີ່ນ" />
        <Divider />
        <CardContent>
          <Box height={300} position="relative" mt={3} mb={3}>
            <Doughnut data={data} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {devices.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} p={1} textAlign="center">
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h3">
                  {value} ລາຍການ
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

ReserveByCustomers.propTypes = {
  className: PropTypes.string,
};

export default ReserveByCustomers;
