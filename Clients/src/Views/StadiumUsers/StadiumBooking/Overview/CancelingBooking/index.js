import React, { useCallback, useRef, useMemo, useEffect } from "react";
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

import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchAvailableCancelBookingNonAccount } from "../../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchCancelBookingNonAccount";

import ReportContainerLayout from "../../../../../Components/ReportContainerLayout";
import { onPopupOpen } from "../../../../../Slices/Features/Popup/popupSlice";
import { onShowBookingDetails } from "../../../../../Slices/Features/StadiumUsers/BookingForNoAccount/preBookingNonAccountSlice";
import NonDataCancelingBooking from "./NonDataCancelingBooking";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";

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
}));

const CancelingBooking = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stadiumId_Admin } = useParams();
  let history = useHistory();

  const { url } = useRouteMatch();
  const { preBookingNonAccountDetailsData, cancelNonAccountSuccess } =
    useShallowEqualSelector((state) => state.preBookingNonAccount);

  useEffect(() => {
    dispatch(fetchAvailableCancelBookingNonAccount(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const onGetCurrentPayment = (payload) => {
    dispatch(onShowBookingDetails(payload));
    dispatch(onPopupOpen("showBookingHistoryInfoAdmin"));
  };

  return (
    <ReportContainerLayout>
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ຍົກເລີກການຈອງ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        {cancelNonAccountSuccess === true &&
          preBookingNonAccountDetailsData.map((items, index) => {
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
                          ລາຍລະອຽດ
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            );
          })}
        {cancelNonAccountSuccess === false && <NonDataCancelingBooking />}
      </Box>
    </ReportContainerLayout>
  );
});

export default CancelingBooking;
