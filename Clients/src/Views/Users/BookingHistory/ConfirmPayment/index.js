import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { fetchGetStadium } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  onMessageClose,
  onNotiOpen,
} from "../../../../Slices/Features/Notification/NotificationSlice";

import { useHistory } from "react-router-dom";

import BillHeader from "./BillHeader";
import PaymentDetails from "./PaymentDetails";
import WaterPaymentDetails from "./WaterPaymentDetails";
import BillFooter from "./BillFooter";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";

import ReactToPrint, { useReactToPrint } from "react-to-print";

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
  ({ totalStadiumPrice, totalWaterPrice, total, data }) => {
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
    const stateRef = useRef(stadiumData);
    const stateUserRef = useRef(data);

    const dispatch = useDispatch();
    const [confirmCheckBox, setConfirmCheckBox] = useState(false);

    //ການເອົາຂໍ້ມູນເດີ່ນ
    useEffect(() => {
      dispatch(fetchGetStadium(stadiumId_Admin));
    }, [dispatch, stadiumId_Admin]);

    useMemo(
      () => data.forEach((items) => (stateRef.current = items)),
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

    const cancel = () => {
      dispatch(onPopupClose());
      dispatch(onNotiOpen("alertSuccessCancelBooking"));
    }

    return (
      <>
        <div ref={componentRef}>
          <Box padding="1rem">
            <Box display="block" justifyContent="center" alignItems="center">
              <Box>
                <BillHeader stadiumData={stateRef.current} />
              </Box>
              <Box>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">ລາຍການຈອງເດີ່ນ</Typography>
                  </Box>
                  <Divider />
                  <Box padding="1rem">
                    <PaymentDetails data={data}/>
                  </Box>
                </Paper>
              </Box>

              {/* <Box>
                <BillFooter
                  totalStadiumPrice={totalStadiumPrice}
                  totalWaterPrice={totalWaterPrice}
                  employee={stateUserRef.current}
                  total={total}
                />
              </Box> */}
            </Box>
          </Box>
        </div>
        {/* <Box>
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
        </Box> */}
        {alertPrint}
        <Box
          display="flex"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box>
            <Button type="submit" color="primary" variant="contained" onClick={cancel}>
              ຍົກເລີກການຈອງ
            </Button>
          </Box>

          {confirmCheckBox === true && (
            <ReactToPrint
              trigger={() => (
                <Box marginLeft=".5rem">
                  <Button color="primary" variant="contained">
                    Print ໃບບິນ
                  </Button>
                </Box>
              )}
              content={() => componentRef.current}
            />
          )}
        </Box>
      </>
    );
  }
);

export default ConfirmPayment;
