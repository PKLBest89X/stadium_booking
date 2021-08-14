import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

import { useDispatch } from "react-redux";
import { onMessageClose } from "../../../../Slices/Features/Notification/NotificationSlice";

import Header from "./Header";
import Information from "./Information";
import Details from "./Details";
import OtherDetails from "./OtherDetails";
import WaterPayment from "./WaterPayment";

import Summary from "./Summary";

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

const PopupDetails = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showReportPayment, showOtherReportPayment, otherReportPaymentState, showReportWater, otherWithWaterState } =
    useShallowEqualSelector((state) => state.reportPayment);

  useEffect(() => {
    return () => dispatch(onMessageClose());
  }, [dispatch]);

  return (
    <>
      <div>
        <Box padding="1rem">
          <Box display="block" justifyContent="center" alignItems="center">
            <Box>
              <Header />
            </Box>
            <Box mt={3} mb={3}>
              <Information />
            </Box>
            <Box>
              <Paper>
                <Box padding="1rem">
                  <Typography variant="h4">ລາຍການຊຳລະຄ່າເດີ່ນ</Typography>
                </Box>
                <Divider />
                <Box>
                  <Details data={showReportPayment} />
                </Box>
              </Paper>
            </Box>
            {otherReportPaymentState === true && (
              <Box mt={3}>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">{`ອີກ ${showOtherReportPayment.length} ລາຍການທີ່ຊຳລະຮ່ວມກັນ`}</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <OtherDetails data={showOtherReportPayment} />
                  </Box>
                </Paper>
              </Box>
            )}
            {otherWithWaterState === true && (
              <Box>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">ລາຍການຊຳລະຄ່ານ້ຳ</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <WaterPayment data={showReportWater} />
                  </Box>
                </Paper>
              </Box>
            )}
            <Summary />
          </Box>
        </Box>
      </div>
    </>
  );
});

export default PopupDetails;
