import React, {
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";

import { useDispatch } from "react-redux";
import { onSaveGetMoney } from "../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

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

const SummarizePayment = forwardRef(
  (
    { totalStadiumPrice, totalWaterPrice, baseTotal, total, totalDeposit },
    ref
  ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data } = useShallowEqualSelector((state) => state.auth);
    const stateRef = useRef(data);
    const [moneyIncome, setMoneyIncome] = useState({
      getMoney: "",
      thonMoney: 0,
    });

    useMemo(() => data.forEach((items) => (stateRef.current = items)), [data]);

    useEffect(
      () =>
        setMoneyIncome((prev) => ({
          ...prev,
          thonMoney: prev.getMoney - total,
        })),
      [total]
    );

    const onGetMoneyIncomeChange = useCallback(
      (event) => {
        const { name, value } = event.target;
        setMoneyIncome((prev) => ({ ...prev, [name]: value }));
        setMoneyIncome((prev) => ({
          ...prev,
          thonMoney: prev.getMoney - total,
        }));
        dispatch(onSaveGetMoney(value));
      },
      [dispatch, total]
    );
    return (
      <div ref={ref}>
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
                    ມື້ຊຳລະເງິນ:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    {moment(Date.now()).format("DD/MM/YYYY")}
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
                    {`${stateRef.current.su_name}`}
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
                  <TextField
                    variant="standard"
                    type="number"
                    label="ເງິນທີ່ຮັບມາ"
                    required
                    InputProps={{
                      inputProps: {
                        min: 0,
                        style: { textAlign: "right" },
                      },
                    }}
                    name="getMoney"
                    value={moneyIncome.getMoney}
                    onChange={onGetMoneyIncomeChange}
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
                    value={moneyIncome.thonMoney}
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
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button type="submit" color="primary" variant="contained">
                ຢືນຢັນຊຳລະເງິນ
              </Button>
            </Box>
          </Card>
        </Box>
      </div>
    );
  }
);

export default SummarizePayment;
