import React, { useCallback, useRef, useMemo } from "react";
import { Avatar, Box, Card, Typography, Grid, Button, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { onShowCustomerInfo } from "../../../../Slices/Features/StadiumUsers/Payment/prePaymentSlice";
import { onSaveSelectedPaymentData } from "../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchAddPayment } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";
import { useDispatch } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  cardLayout: {
    flex: 1,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.between("sm", "sm")]: {
      padding: "1rem 2rem",
    },
  },
  cardContainer: {
    padding: ".3rem",
    transition: "200ms ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  avatar: {
    [theme.breakpoints.down(400)]: {
      height: 60,
      width: 60,
    },
    [theme.breakpoints.between(400, 600)]: {
      height: 70,
      width: 70,
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 80,
      width: 80,
    },
    [theme.breakpoints.up("lg")]: {
      height: 90,
      width: 90,
    },
  },
  paid: {
    color: colors.green[900],
    width: 20,
    height: 20,
  },
  notYet: {
    color: colors.red[600],
    width: 20,
    height: 20,
  },
}));

const BookingListUnCheckout = React.memo(({ bookingBillData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stadiumId_Admin } = useParams();
  let history = useHistory();
  const { url } = useRouteMatch();
  const { paymentData } = useShallowEqualSelector((state) => state.payment);
  const stateRef = useRef(paymentData);

  useMemo(
    () => paymentData.forEach((items) => (stateRef.current = items)),
    [paymentData]
  );

  const onGetCurrentPayment = useCallback(
    async (setSelected) => {
      try {
        const staffToken = JSON.parse(localStorage.getItem("accessAdminToken"));
        if (staffToken && staffToken.token) {
          const dataRequest = {
            stadiumId: stadiumId_Admin,
            token: staffToken.token,
          };
          const addPaymentRequest = await dispatch(
            fetchAddPayment(dataRequest)
          );
          const getResult = unwrapResult(addPaymentRequest);
          if (getResult.status !== 400) {
            history.push(`${url}/${stateRef.current.bp_id}`);
            const customArrayRequest = {
              bp_id: stateRef.current.bp_id,
              ...setSelected,
            };
            dispatch(onSaveSelectedPaymentData(customArrayRequest));
            dispatch(onShowCustomerInfo(setSelected));
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, history, url, stadiumId_Admin]
  );

  return (
    <div className={classes.cardLayout}>
      {bookingBillData.map((items, index) => {
        return (
          <div className={classes.cardContainer} key={index}>
            <Card elevation={10}>
              <Grid container spacing={3}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Box padding={1}>
                    <Box>
                      <Avatar
                        className={classes.avatar}
                        src={`/assets/images/usersPics/usersProfile/${items.profile}`}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    height="100%"
                    padding="0 1em"
                  >
                        <Box>
                          <Typography
                            gutterBottom
                            variant="h4"
                            color="textPrimary"
                          >
                            {items.c_name}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="textSecondary"
                          >{`ຈອງ: ${items.td_start.slice(
                            0,
                            5
                          )} ໂມງ - ${items.td_end.slice(
                            0,
                            5
                          )} ໂມງ`}</Typography>
                          <Box display="flex" alignItems="center">
                            <Typography
                              variant="h6"
                              color="textSecondary"
                            >{`ມື້ເຕະ: ${moment(items.kickoff_date).format(
                              "DD/MM/YYYY"
                            )}`}</Typography>
                            <Box
                              marginLeft=".5rem"
                              display="flex"
                              alignItems="center"
                            >
                              {items.paid_status === "ຈ່າຍແລ້ວ" ? (
                                <CheckIcon className={classes.paid} />
                              ) : (
                                <ClearIcon className={classes.notYet} />
                              )}
                              {items.paid_status === "ຈ່າຍແລ້ວ" ? (
                                <Typography variant="h6" color="textSecondary">
                                  ຈ່າຍແລ້ວ
                                </Typography>
                              ) : (
                                <Typography variant="h6" color="textSecondary">
                                  ບໍ່ຈ່າຍ
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>
                    <Button
                      onClick={() => onGetCurrentPayment(items)}
                      color="primary"
                      variant="contained"
                    >
                      ຊຳລະເງິນ
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </div>
  );
});

export default BookingListUnCheckout;
