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
  const { reportPaymentInfo } = useShallowEqualSelector(
    (state) => state.reportPayment
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
                  {`${reportPaymentInfo.customerName} ${reportPaymentInfo.customerSurname}`}
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
                  {`${reportPaymentInfo.customerType}`}
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
                  {`${reportPaymentInfo.customerTel}`}
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
