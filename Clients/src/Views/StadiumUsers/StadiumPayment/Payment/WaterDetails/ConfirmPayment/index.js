import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  fetchAddPaymentFields,
  fetchAddPaymentWaters,
  fetchConfirmPayment,
  fetchUpdateBookingSubStatus,
  fetchUpdateBookingStatus,
} from "../../../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { fetchGetStadium } from "../../../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  onMessageClose,
  onNotiOpen,
} from "../../../../../../Slices/Features/Notification/NotificationSlice";

import { onPopupClose } from "../../../../../../Slices/Features/Popup/popupSlice";
import { useHistory } from "react-router-dom";

import BillHeader from "./BillHeader";
import PaymentDetails from "./PaymentDetails";
import WaterPaymentDetails from "./WaterPaymentDetails";
import BillFooter from "./BillFooter";

import { useReactToPrint } from "react-to-print";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  text: {
    color: "red",
  },
}));

const ConfirmPayment = React.memo(
  ({ totalStadiumPrice, totalWaterPrice, baseTotal, total, totalDeposit }) => {
    const classes = useStyles();
    let history = useHistory();
    const componentRef = useRef();
    const { stadiumId_Admin, paymentId } = useParams();

    const { paymentDetailsData, waterDetailsData } = useShallowEqualSelector(
      (state) => state.paymentDetails
    );

    const { getAllBookingDetailsData, customerInfo } = useShallowEqualSelector(
      (state) => state.prePayment
    );

    const { selectedPaymentState, selectedWaterState } =
      useShallowEqualSelector((state) => state.paymentDetails);

    const { messageAlert, messageState } = useShallowEqualSelector(
      (state) => state.notification
    );

    const { stadiumData } = useShallowEqualSelector((state) => state.stadium);
    const { data } = useShallowEqualSelector((state) => state.auth);
    const stateRef = useRef(stadiumData);
    const stateUserRef = useRef(data);

    const dispatch = useDispatch();
    const [confirmCheckBox, setConfirmCheckBox] = useState(false);

    //ການເອົາຂໍ້ມູນເດີ່ນ
    useEffect(() => {
      dispatch(fetchGetStadium(stadiumId_Admin));
    }, [dispatch, stadiumId_Admin]);

    useMemo(
      () => stadiumData.forEach((items) => (stateRef.current = items)),
      [stadiumData]
    );

    useMemo(
      () => data.forEach((items) => (stateUserRef.current = items)),
      [data]
    );

    const handleChange = () => {
      setConfirmCheckBox(!confirmCheckBox);
      dispatch(onMessageClose());
    };

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    let alertPrint = null;
    if (messageAlert === "alertPrint" && messageState === true) {
      alertPrint = (
        <Box display="flex" alignItems="center">
          <Typography className={classes.text} variant="h5" color="secondary">
            ທ່ານຕ້ອງ Print ບິນກ່ອນ ຫຼືວ່າ ຕ້ອງບໍ່ Print ບິນ!
          </Typography>
        </Box>
      );
    }

    const findingBookingFromPaymentDetails = (bookingId, array1, array2) => {
      let remainData = [];
      remainData = array1.filter((items) => items.b_id === bookingId);
      let remainData2 = [];
      remainData2 = remainData.filter(
        (items1) =>
          !array2.some(
            (items2) =>
              items1.b_id === items2.b_id &&
              items1.std_id === items2.std_id &&
              items1.td_id === items2.td_id &&
              items1.kickoff_date === items2.kickoff_date
          )
      );
      if (remainData2.length > 0) {
        return 0;
      } else {
        return 1;
      }
    };

    const fetchingAddPaymentDetails = useCallback(
      async (paymentDetails) => {
        try {
          const addPaymentDetails = await dispatch(
            fetchAddPaymentFields(paymentDetails)
          );
          const getResponse = unwrapResult(addPaymentDetails);
          return getResponse;
        } catch (err) {
          console.log(err);
          return 0;
        }
      },
      [dispatch]
    );

    const fetchingAddWaterDetails = useCallback(
      async (waterDetails) => {
        try {
          const addWaterDetails = await dispatch(
            fetchAddPaymentWaters(waterDetails)
          );
          const getResponse = unwrapResult(addWaterDetails);
          return getResponse;
        } catch (err) {
          console.log(err);
          return 0;
        }
      },
      [dispatch]
    );

    const fetchingConfirmPayment = useCallback(
      async (data) => {
        try {
          const confirmPayment = await dispatch(fetchConfirmPayment(data));
          const getResponse = unwrapResult(confirmPayment);
          return getResponse;
        } catch (err) {
          console.log(err);
          return 0;
        }
      },
      [dispatch]
    );

    const fetchingUpdateBookingSubStatus = useCallback(
      async (array1, array2) => {
        try {
          let remainData = [];
          remainData = array1.filter((items1) =>
            array2.some(
              (items2) =>
                items1.b_id === items2.b_id &&
                items1.std_id === items2.std_id &&
                items1.td_id === items2.td_id &&
                items1.kickoff_date === items2.kickoff_date
            )
          );
          if (remainData.length > 0) {
            const updateBookingSubStatus = await dispatch(
              fetchUpdateBookingSubStatus(remainData)
            );
            const getResponse = unwrapResult(updateBookingSubStatus);
            return getResponse;
          }
        } catch (err) {
          console.log(err);
          return 0;
        }
      },
      [dispatch]
    );

    const fetchingUpdateBookingStatus = useCallback(
      async (bookingId) => {
        try {
          const updateBookingStatus = await dispatch(
            fetchUpdateBookingStatus(bookingId)
          );
          const getResponse = unwrapResult(updateBookingStatus);
          return getResponse;
        } catch (err) {
          console.log(err);
          return 0;
        }
      },
      [dispatch]
    );

    const goBackAfterAcceptPayment = useCallback(async () => {
      dispatch(onPopupClose());
      history.push(`/admin/stadium/${stadiumId_Admin}/stadium-payment`);
      dispatch(onNotiOpen("successPayment"));
    }, [dispatch, history, stadiumId_Admin]);

    const confirmPayment = useCallback(
      async (handlePrint) => {
        if (confirmCheckBox === true) await handlePrint();

        if (paymentDetailsData.length > 0 && waterDetailsData.length === 0) {
          try {
            await fetchingAddPaymentDetails(paymentDetailsData);
            await fetchingUpdateBookingSubStatus(
              getAllBookingDetailsData,
              paymentDetailsData
            );
            const requestData = {
              bookingId: customerInfo.bookingId,
              paymentId,
              total_waterPrice: totalWaterPrice,
              total_stadiumPrice: totalStadiumPrice,
            };
            await fetchingConfirmPayment(requestData);
            let check = findingBookingFromPaymentDetails(
              customerInfo.bookingId,
              getAllBookingDetailsData,
              paymentDetailsData
            );
            if (check === 1) {
              await fetchingUpdateBookingStatus(customerInfo.bookingId);
              goBackAfterAcceptPayment();
            } else if (check === 0) {
              goBackAfterAcceptPayment();
            }
          } catch (err) {
            console.log(err);
          }
          return;
        }

        if (paymentDetailsData.length > 0 && waterDetailsData.length > 0) {
          try {
            await fetchingAddPaymentDetails(paymentDetailsData);
            await fetchingAddWaterDetails(waterDetailsData);
            await fetchingUpdateBookingSubStatus(
              getAllBookingDetailsData,
              paymentDetailsData
            );
            const requestData = {
              bookingId: customerInfo.bookingId,
              paymentId,
              total_waterPrice: totalWaterPrice,
              total_stadiumPrice: totalStadiumPrice,
            };
            await fetchingConfirmPayment(requestData);
            let check2 = findingBookingFromPaymentDetails(
              customerInfo.bookingId,
              getAllBookingDetailsData,
              paymentDetailsData
            );
            if (check2 === 1) {
              await fetchingUpdateBookingStatus(customerInfo.bookingId);
              goBackAfterAcceptPayment();
            } else if (check2 === 0) {
              goBackAfterAcceptPayment();
            }
          } catch (err) {
            console.log(err);
          }
        }
      },
      [
        confirmCheckBox,
        getAllBookingDetailsData,
        paymentDetailsData,
        waterDetailsData,
        totalStadiumPrice,
        totalWaterPrice,
        fetchingAddPaymentDetails,
        fetchingConfirmPayment,
        fetchingUpdateBookingStatus,
        goBackAfterAcceptPayment,
        fetchingUpdateBookingSubStatus,
        fetchingAddWaterDetails,
        customerInfo.bookingId,
        paymentId,
      ]
    );

    const ShowEmptyPayment = () => (
      <div className={classes.emptyView}>
        <Typography variant="h4" color="textSecondary">
          ບໍ່ມີຂໍ້ມູນລການຊຳລະຄ່າເດີ່ນ
        </Typography>
      </div>
    );

    const ShowEmptyWater = () => (
      <div className={classes.emptyView}>
        <Typography variant="h4" color="textSecondary">
          ບໍ່ມີຂໍ້ມູນເຄື່ອງດື່ມ
        </Typography>
      </div>
    );

    return (
      <>
        <div ref={componentRef}>
          <Box padding="1rem">
            <Box display="block" justifyContent="center" alignItems="center">
              <Box>
                <BillHeader
                  stadiumData={stateRef.current}
                  paymentId={paymentId}
                />
              </Box>
              <Box>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">ລາຍການຊຳລະຄ່າເດີ່ນ</Typography>
                  </Box>
                  <Divider />
                  <Box padding="1rem">
                    {selectedPaymentState === true && <PaymentDetails />}
                    {selectedPaymentState === false && <ShowEmptyPayment />}
                  </Box>
                </Paper>
              </Box>
              <Box>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">ລາຍການຊຳລະຄ່ານ້ຳ</Typography>
                  </Box>
                  <Divider />
                  <Box padding="1rem">
                    {selectedWaterState === true && <WaterPaymentDetails />}
                    {selectedWaterState === false && <ShowEmptyWater />}
                  </Box>
                </Paper>
              </Box>
              <Box>
                <BillFooter
                  totalStadiumPrice={totalStadiumPrice}
                  totalWaterPrice={totalWaterPrice}
                  employee={stateUserRef.current}
                  baseTotal={baseTotal}
                  total={total}
                  totalDeposit={totalDeposit}
                />
              </Box>
            </Box>
          </Box>
        </div>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmCheckBox}
                onChange={handleChange}
                name="checkedA"
              />
            }
            label={
              <Typography variant="h5" color="textSecondary">
                ເອົາໃບບິນພ້ອມ
              </Typography>
            }
          />
        </Box>
        {alertPrint}
        <Box
          display="flex"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => confirmPayment(handlePrint)}
            >
              ຢືນຢັນ
            </Button>
          </Box>
        </Box>
      </>
    );
  }
);

export default ConfirmPayment;
