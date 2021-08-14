import React from "react";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import {
  Box,
  CardHeader,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@material-ui/core";
import moment from "moment";
import NumberFormat from "react-number-format";

const Summary = React.memo(() => {
  const { reportSummaryPayment } = useShallowEqualSelector(
    (state) => state.reportPayment
  );
  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h4" color="textSecondary">
                ລາຍລະອຽດການຊຳລະເງິນ
              </Typography>
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
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ບິນເລກທີ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {reportSummaryPayment.paymentId}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ມື້ຊຳລະເງິນ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {moment(reportSummaryPayment.paymentDate).format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ບໍລິການໂດຍ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${reportSummaryPayment.employee}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ລວມລາຄາເດີ່ນ:{" "}
                </Typography>
                <NumberFormat
                  value={reportSummaryPayment.totalStadium}
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ລວມລາຄານ້ຳ:{" "}
                </Typography>
                <NumberFormat
                  value={reportSummaryPayment.totalWater}
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ລວມທັງໝົດ:{" "}
                </Typography>
                <NumberFormat
                  value={reportSummaryPayment.total}
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
});

export default Summary;
