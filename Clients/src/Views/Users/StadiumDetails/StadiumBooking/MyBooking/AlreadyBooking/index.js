import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
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

const AlreadyBooking = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => dispatch(onTabOpen("tabBackToOverviewBooking")))

  const onPushToBookingHistory = () => {
    history.push("/booking-history");
  };
  
  return (
    <div className={classes.componentContainer}>
      <div className={classes.contentContainer}>
        <LibraryAddCheckIcon className={classes.bookingIcon} />
        <div className={classes.textContainer}>
          <Typography variant="h3" color="textSecondary">
            ການຈອງເດີ່ນຂອງທ່ານໄດ້ຮັບການອະນຸມັດແລ້ວ!!
          </Typography>
          <Typography variant="h5" color="textSecondary">
            ການຈອງເດີ່ນປັດຈຸບັນຂອງທ່ານແມ່ນຍັງບໍ່ໄດ້ດຳເນີນການຊຳລະຄ່າເດີ່ນ,
            ຕ້ອງການກວດສອບ ຫຼື ຍົກເລີກການຈອງ?
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

export default AlreadyBooking;
