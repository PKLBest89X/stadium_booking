import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Grid,
  Button,
  colors,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";

import { fetchAuthUser } from "../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { fetchGetHistoryDetailsByUser } from "../../../../middlewares/user/fetchBookingHistory/fetchBookingHistory";

import ReportContainerLayout from "../../../../Components/ReportContainerLayout";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import {
  onShowBookingHistory,
  onLoadUserPendingBooking,
} from "../../../../Slices/Features/Users/bookingHistory/bookingHistorySlice";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import NonPendingBooking from "./NonPendingBooking";

const useStyles = makeStyles((theme) => ({
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
  textActive: {
    color: colors.green[600],
  },
  textPending: {
    color: colors.yellow[800],
  },
  textVoid: {
    color: colors.red[600],
  },
}));

const PendingBooking = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userPendingData, userPendingSuccess, resultSearchAndSeletedDate } =
    useShallowEqualSelector((state) => state.bookingHistory);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  useEffect(() => {
    const getReportBooking = async () => {
      let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
      if (userToken && userToken.token) {
        await dispatch(fetchGetHistoryDetailsByUser(userToken.token));
        dispatch(onLoadUserPendingBooking("pending"));
      }
    };
    getReportBooking();
  }, [dispatch]);

  const onGetCurrentPayment = (payload) => {
    dispatch(onShowBookingHistory(payload));
    dispatch(onPopupOpen("showBookingHistoryInfo"));
  };

  return (
    <ReportContainerLayout>
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ການຈອງທີ່ລໍຖ້າອະນຸມັດ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        {userPendingSuccess === true &&
          (resultSearchAndSeletedDate.length > 0
            ? resultSearchAndSeletedDate
            : userPendingData
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
                            src={`/assets/images/adminPics/stadiumPics/icons/${items.logo}`}
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
                            {items.st_name}
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
                          <Box display="flex" alignItems="center">
                            <Box marginRight=".5rem">
                              <Typography variant="h6" color="textSecondary">
                                ສະຖານະ:
                              </Typography>
                            </Box>
                            {items.approve_state === "void" && (
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                className={classes.textVoid}
                              >
                                ການຈອງໂມຄະ
                              </Typography>
                            )}
                            {items.approve_state === "pending" && (
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                className={classes.textPending}
                              >
                                ລໍຖ້າອະນຸມັດ
                              </Typography>
                            )}
                            {items.approve_state === "active" && (
                              <Typography
                                color="textSecondary"
                                variant="h6"
                                className={classes.textActive}
                              >
                                ອະນຸມັດແລ້ວ
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Button
                          onClick={() => onGetCurrentPayment(items)}
                          color="primary"
                          variant="contained"
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
        {userPendingSuccess === false && <NonPendingBooking />}
      </Box>
    </ReportContainerLayout>
  );
});

export default PendingBooking;
