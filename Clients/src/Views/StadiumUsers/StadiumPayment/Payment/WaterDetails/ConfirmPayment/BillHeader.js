import React from "react";
import {
    Paper,
    Typography,
    Box,
    Button,
    Divider,
    Avatar,
  } from "@material-ui/core";

  import moment from "moment";
  import { makeStyles } from "@material-ui/core/styles";


  const useStyles = makeStyles(() => ({
    text: {
      color: "red",
    },
    avatar: {
      height: 100,
      width: 100,
    },
  }));

const BillHeader = ({ stadiumData, paymentId }) => {
    const classes = useStyles();
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
            src={`/assets/images/adminPics/stadiumPics/icons/${stadiumData.logo}`}
          />
        </Box>
        <Box marginLeft=".5rem">
          <Typography variant="h2" color="textPrimary">
            {`${stadiumData.st_name}`}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
        mt={2}
      >
        <Typography variant="h5" color="textPrimary">
          {`ວັນທີ: ${moment(Date.now()).format("MM/DD/YYYY")}`}
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
          {`ເລກທີ: ${paymentId}`}
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
      </Box>
    </>
  );
};

export default BillHeader;
