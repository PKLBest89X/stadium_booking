import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TimerIcon from "@material-ui/icons/Timer";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { useDispatch } from "react-redux";
import { onTabOpen } from "../../../../../../Slices/Features/Popup/popupSlice";

const useStyles = makeStyles(() => ({
  componentContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: "140px",
    paddingBottom: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bookingIcon: {
    width: "120px",
    height: "120px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "& > :first-child": {
      marginTop: "1rem",
      marginBottom: ".5rem",
    },
    "& > :last-child": {
      marginTop: ".5rem",
      marginBottom: "1rem",
    },
  },
}));

const PendingBooking = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => dispatch(onTabOpen("tabBackToOverviewBooking")));

  const onPushToBookingHistory = () => {
    history.push("/booking-history");
  };

  return (
    <div className={classes.componentContainer}>
      <div className={classes.contentContainer}>
        <TimerIcon className={classes.bookingIcon} />
        <div className={classes.textContainer}>
          <Typography variant="h3" color="textSecondary">
            ທ່ານໄດ້ມີການຈອງເດີ່ນແລ້ວ!!
          </Typography>
          <Typography variant="h5" color="textSecondary">
            ການຈອງເດີ່ນປັດຈຸບັນຂອງທ່ານແມ່ນຈະຕ້ອງທຳການຈ່າຍຄ່າມັດຈຳ ແລະ
            ລໍຖ້າການອະນຸມັດການຈອງຄັ້ງນີ້ຈາກທາງເດີ່ນ. ທ່ານຕ້ອງການກວດສອບ?
          </Typography>
        </div>
        <Button
          startIcon={<FindInPageIcon />}
          color="primary"
          variant="contained"
          onClick={onPushToBookingHistory}
        >
          ກວດສອບ
        </Button>
      </div>
    </div>
  );
};

export default PendingBooking;