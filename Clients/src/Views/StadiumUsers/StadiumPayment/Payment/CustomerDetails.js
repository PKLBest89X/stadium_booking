import React, { forwardRef, useCallback, useState, useEffect } from "react";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useHistory } from "react-router-dom";
import {
  Box,
  CardHeader,
  TextField,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Divider,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  confirmBooking: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
}));

const CustomerDetails = forwardRef((props, ref) => {
  const classes = useStyles();
  const { customerInfo } = useShallowEqualSelector((state) => state.prePayment);
  let history = useHistory();

  return (
    <div ref={ref}>
      <Box mb={3}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h4" color="textSecondary">
                ຂໍ້ມູນຂອງລູກຄ້າ
              </Typography>
            }
            action={
              <Tooltip title="ຄົ້ນຫາລູກຄ້າ">
                <IconButton onClick={() => history.goBack()}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            }
          />
          <Divider />
          <CardContent>
            <Box
              display="block"
              justifyContent="center"
              alignItems="center"
              padding="1rem"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
                width="100%"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ລູກຄ້າ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${customerInfo.customerfirstName} ${customerInfo.customerlastName}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
                width="100%"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ປະເພດການຈອງ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${customerInfo.customerType}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
                width="100%"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ເບີໂທ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${customerInfo.customerTel}`}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
});

export default CustomerDetails;
