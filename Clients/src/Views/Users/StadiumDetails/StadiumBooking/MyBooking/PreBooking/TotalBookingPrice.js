import React, { forwardRef } from "react";
import {
  Box,
  CardHeader,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";

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

const TotalBookingPrice = forwardRef(
  ({ percentOfDeposit, timeCancel, totalBookingPrice, totalDeposit }, ref) => {
    const classes = useStyles();
    return (
      <div ref={ref}>
        <Box mt={3}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h4" color="textSecondary">
                  ລາຄາ ແລະ ເງື່ອນໄຂຂອງການຈອງເດີ່ນ
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
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ລາຄາກ່ອນຈ່າຍ:{" "}
                  </Typography>
                  <NumberFormat
                    value={totalBookingPrice}
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
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ເປີເຊັນຄ່າມັດຈຳ:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    {`${percentOfDeposit} %`}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ເງິນມັດຈຳຕ້ອງຈ່າຍ:{" "}
                  </Typography>
                  <NumberFormat
                    value={totalDeposit}
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
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ມື້ຈອງເດີ່ນ:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    {moment(Date.now()).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ໄລຍະຈ່າຍຄ່າມັດຈຳ:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    {`${timeCancel} ຊົ່ວໂມງ`}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ຍົກເລີກຈອງໄດ້:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    {`${timeCancel} ຊົ່ວໂມງ`}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button type="submit" color="primary" variant="contained">
                ຢືນຢັນຈອງເດີ່ນ
              </Button>
            </Box>
          </Card>
        </Box>
      </div>
    );
  }
);

export default TotalBookingPrice;
