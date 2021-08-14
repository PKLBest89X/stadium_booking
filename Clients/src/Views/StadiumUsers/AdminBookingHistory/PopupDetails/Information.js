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

const Information = React.memo(() => {
  const { reportBookingInfo } = useShallowEqualSelector(
    (state) => state.reportBooking
  );
  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h4" color="textSecondary">
                ລາຍລະອຽດ
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
                  ລູກຄ້າ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${reportBookingInfo.customerName} ${reportBookingInfo.customerSurname}`}
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
                  ປະເພດການຈອງ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${reportBookingInfo.customerType}`}
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
                  ເບີໂທ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${reportBookingInfo.customerTel}`}
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
                  ມື້ຈອງ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${moment(reportBookingInfo.bookingDate).format("MM-DD-YYYY, h:mm:ss a")}`}
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
                  ຍົກເລີກກ່ອນ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${moment(reportBookingInfo.bookingCancel).format("MM-DD-YYYY, h:mm:ss a")}`}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
});

export default Information;
