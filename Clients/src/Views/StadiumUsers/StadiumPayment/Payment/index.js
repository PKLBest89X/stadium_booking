import React, { useEffect, useRef } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckPayment } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidPayment";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Box } from "@material-ui/core";

import { onLoadCurrentSaveSelectedPayment } from "../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import PopupLayout from "../../../../Components/PopupLayout";
import NotificationAlert from "../../../../Components/NotificationAlert";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import { onNotiOpen } from "../../../../Slices/Features/Notification/NotificationSlice";

import PaymentTable from "./PaymentDetails/PaymentTable";
import PaymentToolbar from "./PaymentDetails/PaymentToolbar";
import WaterToolbar from "./WaterDetails/WaterToolbar";
import WaterTable from "./WaterDetails/WaterTable";
import AddWaterPayment from "./WaterDetails/AddWaterPaymentForm";
import EditWaterPayment from "./WaterDetails/EditWaterPaymentForm";
import CustomerDetails from "./CustomerDetails";
import SummarizePayment from "./SummarizePayment";
import ConfirmPayment from "./WaterDetails/ConfirmPayment";
import moment from "moment";
import { fetchGetWaterForPayment } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10rem",
    paddingBottom: "10rem",
  },
}));

const BookingView = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkPaymentResult } = useShallowEqualSelector(
    (state) => state.validPaymentData
  );
  const { stadiumId_Admin, paymentId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const customerRef = useRef();
  const totalPaymentPriceRef = useRef();

  const { watersData } = useShallowEqualSelector((state) => state.getDrinks);

  const {
    selectedPaymentState,
    selectedWaterState,
    paymentDetailsData,
    paymentDetailsSelected,
    waterDetailsData,
    waterDetailsSelected,
    totalStadiumPrice,
    totalWaterPrice,
    total,
    getMoney,
    customerInfo,
  } = useShallowEqualSelector((state) => state.paymentDetails);

  useEffect(() => dispatch(onLoadCurrentSaveSelectedPayment()), [dispatch]);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເລກບິນການຈອງເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckPayment(paymentId));
  }, [dispatch, paymentId]);

  useEffect(() => {
    if (checkPaymentResult === 404) {
      history.replace("/404");
    }
  }, [history, checkPaymentResult]);

  //ເອົາຂໍ້ມູນດື່ມເພື່ອໃຊ້ໃນການຂາຍ
  useEffect(() => {
    dispatch(fetchGetWaterForPayment(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

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

  let addWaterPayment = null;
  if (popupName === "addWaterPayment" && isOpen === true) {
    addWaterPayment = (
      <PopupLayout customWidth={true}>
        <AddWaterPayment watersData={watersData} />
      </PopupLayout>
    );
  }

  let editWaterPayment = null;
  if (popupName === "editWaterPayment" && isOpen === true) {
    editWaterPayment = (
      <PopupLayout>
        <EditWaterPayment watersData={waterDetailsSelected} />
      </PopupLayout>
    );
  }

  let conformPaymentForm = null;
  if (popupName === "confirmPayment" && isOpen === true) {
    conformPaymentForm = (
      <PopupLayout customWidth={true}>
        <ConfirmPayment
          totalStadiumPrice={totalStadiumPrice}
          totalWaterPrice={totalWaterPrice}
          total={total}
        />
      </PopupLayout>
    );
  }

  let alertNonDataPayment = null;
  if (notiName === "emptyPaymentData" && notiState === true) {
    alertNonDataPayment = (
      <NotificationAlert notiTitle="ຄຳເຕືອນ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ຕ້ອງມີລາຍລະອຽດການຊຳລະຄ່າເດີ່ນ ຫຼື ເຄື່ອງດື່ມ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  let alertLowPrice = null;
  if (notiName === "lowPrice" && notiState === true) {
    alertLowPrice = (
      <NotificationAlert notiTitle="ຄຳເຕືອນ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ເງິນທີ່ຮັບມາຕ້ອງຫຼາຍກວ່າລາຄາຕ້ອງຈ່າຍ!!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  const onConfirmBooking = (event) => {
    event.preventDefault();
    if (paymentDetailsData.length > 0) {
      if (getMoney < total) return dispatch(onNotiOpen("lowPrice"));
      dispatch(onPopupOpen("confirmPayment"));
    } else {
      dispatch(onNotiOpen("emptyPaymentData"));
    }
  };
  return (
    <>
      {addWaterPayment}
      {editWaterPayment}
      {alertNonDataPayment}
      {alertLowPrice}
      {conformPaymentForm}
      <PageLayout title="Payment Form" {...rest}>
        <div className={classes.pageContainer}>
          <div className={classes.root}>
            <form onSubmit={onConfirmBooking}>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  ຊຳລະການຈອງເດີ່ນ ແລະ ເຄື່ອງດື່ມ
                </Typography>
              </Box>
              <Divider />
              <Box mt={3}>
                <Paper className={classes.paper}>
                  <CustomerDetails ref={customerRef} />
                </Paper>
                <Box>
                  <Paper className={classes.paper}>
                    <PaymentToolbar
                      numSelected={paymentDetailsSelected.length}
                      dataForDelete={paymentDetailsSelected}
                    />
                    <Divider />
                    {selectedPaymentState === true && (
                      <PaymentTable paymentDetails={paymentDetailsData} />
                    )}
                    {selectedPaymentState === false && <ShowEmptyPayment />}
                  </Paper>
                </Box>
                <Box mt={3}>
                  <Paper className={classes.paper}>
                    <WaterToolbar
                      numSelected={waterDetailsSelected.length}
                      dataForDelete={waterDetailsSelected}
                    />
                    <Divider />
                    {selectedWaterState === true && (
                      <WaterTable waterDetails={waterDetailsData} />
                    )}
                    {selectedWaterState === false && <ShowEmptyWater />}
                  </Paper>
                </Box>

                <Paper className={classes.paper}>
                  <SummarizePayment
                    totalStadiumPrice={totalStadiumPrice}
                    totalWaterPrice={totalWaterPrice}
                    total={total}
                    ref={totalPaymentPriceRef}
                  />
                </Paper>
              </Box>
            </form>
          </div>
        </div>
      </PageLayout>
    </>
  );
});
export default BookingView;
