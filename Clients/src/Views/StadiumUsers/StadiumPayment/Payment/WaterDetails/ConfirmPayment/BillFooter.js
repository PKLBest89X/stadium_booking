import React from "react";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
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
import NumberFormat from "react-number-format";
import moment from "moment";

const BillFooter = React.memo(
  ({
    totalStadiumPrice,
    totalWaterPrice,
    baseTotal,
    total,
    totalDeposit,
    employee,
  }) => {
    const { getMoney, thonMoney } = useShallowEqualSelector(
      (state) => state.paymentDetails
    );
    const { customerInfo } = useShallowEqualSelector(
      (state) => state.prePayment
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
                    ບໍລິການໂດຍ:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    {`${employee.su_name}`}
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
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ລວມລາຄາເດີ່ນ:{" "}
                  </Typography>
                  <NumberFormat
                    value={totalStadiumPrice}
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
                    value={totalWaterPrice}
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
                    value={baseTotal}
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
                    ຄ່າມັດຈຳທີ່ຈ່າຍ:{" "}
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
                  alignItems="center"
                  mb={2}
                  mt={2}
                >
                  <Typography variant="h4" color="textSecondary">
                    ລວມສຸດທິ:{" "}
                  </Typography>
                  <NumberFormat
                    value={total}
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
                    ຮັບເງິນມາ:{" "}
                  </Typography>
                  <NumberFormat
                    value={getMoney}
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
                    ເງິນທອນ:{" "}
                  </Typography>
                  <NumberFormat
                    value={thonMoney}
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
  }
);

export default BillFooter;
