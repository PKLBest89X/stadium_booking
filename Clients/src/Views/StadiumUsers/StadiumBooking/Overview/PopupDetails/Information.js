import React from "react";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
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

const Information = React.memo(() => {
  const { information } = useShallowEqualSelector(
    (state) => state.preBookingNonAccount
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
                  {`${information.customerName} ${information.customerSurname}`}
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
                  {`${information.customerType}`}
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
                  {`${information.customerTel}`}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
                <Typography variant="h4" color="textSecondary">
                  ລາຄາລວມ:{" "}
                </Typography>
                <NumberFormat
                  value={information.total}
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
              <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
                <Typography variant="h4" color="textSecondary">
                  ເປີເຊັນຄ່າມັດຈຳ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${information.depositPercent} %`}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
                <Typography variant="h4" color="textSecondary">
                  ເງິນມັດຈຳຕ້ອງຈ່າຍ:{" "}
                </Typography>
                <NumberFormat
                  value={information.totalDeposit}
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
                  ມື້ຈອງ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${moment(information.bookingDate).format(
                    "MM-DD-YYYY, h:mm:ss a"
                  )}`}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
                <Typography variant="h4" color="textSecondary">
                  ໄລຍະຈ່າຍຄ່າມັດຈຳ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${moment(information.depositTimeLimit).format(
                    "MM-DD-YYYY, h:mm:ss a"
                  )}`}
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
                  {`${moment(information.bookingCancel).format(
                    "MM-DD-YYYY, h:mm:ss a"
                  )}`}
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
