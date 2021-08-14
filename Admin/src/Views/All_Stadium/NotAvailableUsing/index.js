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
import ReportContainerLayout from "../../../Components/ReportContainerLayout";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";

import { fetchGetNotAvailableStadiums } from "../../../middlewares/fetchAllStadiums";
import { fetchAuthSuperAdmin } from "../../../middlewares/fetchAuth";

import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import NonStadiums from "../NonStadiums";
import { onPopupOpen } from "../../../Slices/Features/Popup/popupSlice";
import { onShowStadiumdetails } from "../../../Slices/allStadiumsSlice";

const useStyles = makeStyles((theme) => ({
  cardLayout: {
    flex: 1,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.between("sm", "sm")]: {
      padding: "1rem 2rem",
    },
  },
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

const NotAvailableUsing = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { notAvailableData, notAvailableSuccess } = useShallowEqualSelector(
    (state) => state.allStadiums
  );

  useEffect(() => {
    const superAdminToken = JSON.parse(
      localStorage.getItem("accessSuperAdminToken")
    );
    if (superAdminToken && superAdminToken.token) {
      dispatch(fetchAuthSuperAdmin(superAdminToken.token));
    }
  }, [dispatch]);

  useEffect(() => dispatch(fetchGetNotAvailableStadiums()), [dispatch]);

  const onGetCurrentPayment = (payload) => {
    dispatch(onShowStadiumdetails(payload));
    dispatch(onPopupOpen("showStadiumDetails"));
  };

  return (
    <ReportContainerLayout>
      <Box padding="1rem">
        <Typography variant="h3" color="textSecondary">
          ເດີ່ນທີ່ບໍ່ພ້ອມໃຊ້ງານ
        </Typography>
      </Box>
      <Divider />
      <Box padding="1rem">
        {notAvailableSuccess === true &&
          notAvailableData.map((items, index) => {
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
                          <Box display="flex" alignItems="center">
                            <Typography variant="h6" color="textSecondary">
                              ສະຖານະ:
                            </Typography>
                            <Box
                              marginLeft=".3rem"
                              display="flex"
                              alignItems="center"
                            >
                              {items.status === "ດຳເນີນການ" ? (
                                <CheckIcon className={classes.paid} />
                              ) : (
                                <ClearIcon className={classes.notYet} />
                              )}
                              {items.status === "ດຳເນີນການ" ? (
                                <Typography variant="h6" color="textSecondary">
                                  ດຳເນີນການ
                                </Typography>
                              ) : (
                                <Typography variant="h6" color="textSecondary">
                                  ບໍ່ພ້ອມໃຊ້ງານ
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          <Typography
                            variant="h6"
                            color="textSecondary"
                          >{`ມື້ລົງທະບຽນ: ${moment(items.regis_date).format(
                            "DD/MM/YYYY"
                          )}`}</Typography>
                        </Box>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => onGetCurrentPayment(items)}
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
        {notAvailableSuccess === false && <NonStadiums />}
      </Box>
    </ReportContainerLayout>
  );
});

export default NotAvailableUsing;
