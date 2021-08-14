import React from "react";
import {
    Paper,
    Typography,
    Box,
    Button,
    Divider,
    Avatar,
  } from "@material-ui/core";

  import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
  import moment from "moment";
  import { makeStyles } from "@material-ui/core/styles";


  const useStyles = makeStyles(() => ({
    text: {
      color: "red",
    },
    avatar: {
      height: 200,
      width: 200,
    },
  }));

const BillHeader = React.memo(() => {
    const classes = useStyles();
    const { reportBookingInfo } = useShallowEqualSelector((state) => state.reportBooking);
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
      >
        <Box marginRight=".5rem">
          <Avatar
            className={classes.avatar}
            src={`/assets/images/usersPics/usersProfile/${reportBookingInfo.customerProfile}`}
          />
        </Box>
      </Box>
      {/* <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
        mt={2}
      >
        <Typography variant="h5" color="textPrimary">
          {`ເລກທີ: ${paymentId}`}
        </Typography>
      </Box> */}

      {/* <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
        mt={2}
      >
        <Typography variant="h5" color="textPrimary">
          {`ທີ່ຢູ່: ${stadiumData.village}, ${stadiumData.district}, ${stadiumData.province}`}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
        mt={2}
      >
        <Typography variant="h5" color="textPrimary">
          {`ເບີໂທ: ${stadiumData.phone}`}
        </Typography>
      </Box> */}
    </>
  );
});

export default BillHeader;
