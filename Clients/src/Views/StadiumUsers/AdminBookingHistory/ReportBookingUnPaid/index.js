import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Divider,
  colors,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import ReportContainerLayout from "../../../../Components/ReportContainerLayout";
import NonBookingHistory from "../NonBookingHistory";

import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

import { fetchGetBookingByAdmin } from "../../../../middlewares/stadiumUser/fetchReport/fetchBookingReport";
import { unwrapResult } from "@reduxjs/toolkit";

import { useHistory, useParams } from "react-router-dom";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import { onShowReportBooking } from "../../../../Slices/Features/StadiumUsers/Reports/reportBookingSlice";
import { onLoadAdminBookingUnPaid } from "../../../../Slices/Features/StadiumUsers/Reports/reportBookingSlice";
import { useDispatch } from "react-redux";
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

const ReportBookingUnPaid = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { reportUnPaidData, reportUnPaidSuccess, resultSearchAndSeletedDate } =
    useShallowEqualSelector((state) => state.reportBooking);
  const { stadiumId_Admin } = useParams();
  let history = useHistory();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      const authRequest = async () => {
        const getReponse = await dispatch(fetchAuthAdmin(adminToken.token));
        const result = unwrapResult(getReponse);
        if (result.role === "staff") {
          history.replace("/401");
        }
        dispatch(userNow("admin"));
      };
      authRequest();
    }
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    const getReportBooking = async () => {
      await dispatch(fetchGetBookingByAdmin(stadiumId_Admin));
      dispatch(onLoadAdminBookingUnPaid("ຍັງບໍ່ເຕະ"));
    };
    getReportBooking();
  }, [dispatch, stadiumId_Admin]);

  const onGetCurrentPayment = (payload) => {
    dispatch(onShowReportBooking(payload));
    dispatch(onPopupOpen("showReportBookingInfo"));
  };

  return (
    <ReportContainerLayout>
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ການຈອງທີ່ຍັງບໍ່ໄດ້ຊຳລະຄ່າ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        {reportUnPaidSuccess === true &&
          (resultSearchAndSeletedDate.length > 0
            ? resultSearchAndSeletedDate
            : reportUnPaidData
          ).map((items, index) => {
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
                              {items.sub_status === "ເຕະແລ້ວ" ? (
                                <CheckIcon className={classes.paid} />
                              ) : (
                                <ClearIcon className={classes.notYet} />
                              )}
                              {items.sub_status === "ເຕະແລ້ວ" ? (
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
                          color="primary"
                          variant="contained"
                          onClick={() => onGetCurrentPayment(items)}
                        >
                          ລາຍລະອຽດ
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            );
          })}
        {reportUnPaidSuccess === false && <NonBookingHistory />}
      </Box>
    </ReportContainerLayout>
  );
});

export default ReportBookingUnPaid;
