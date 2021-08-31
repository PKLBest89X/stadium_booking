import React, { useEffect, useMemo, useRef } from "react";
import ChildPageLayout from "../../../../Components/ChildPageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadium } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import ShowAddress from "./ShowAddress";
import ShowDescription from "./ShowDescription";
import ShowFollowers from "./ShowFollowers";
import ShowCancelBooking from "./ShowCancelBooking";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateStadium from "./UpdateStadium";

import { unwrapResult } from "@reduxjs/toolkit";
import ShowPercentOfBooking from "./ShowPercentOfDeposit";
import ShowDepositTime from "./ShowDepositTime";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, .5)",
  },
  picture: {
    cursor: "pointer",
    display: "block",
    width: "100%",
    boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, .5)",
    borderRadius: "5px",
    [theme.breakpoints.between("sm", "sm")]: {
      objectFit: "contain",
    },
  },
}));

const Overall = React.memo(() => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumData } = useShallowEqualSelector((state) => state.stadium);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const stateRef = useRef(stadiumData);
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      const authRequest = async () => {
        const getReponse = await dispatch(fetchAuthAdmin(adminToken.token));
        const result = unwrapResult(getReponse);
        if (result.role === "staff") {
          history.replace("/401");
        }
        dispatch(userNow("admin"));
      };
      authRequest();
    }
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useMemo(
    () => stadiumData.forEach((items) => (stateRef.current = items)),
    [stadiumData]
  );

  let UpdateStadiumForm = null;
  if (popupName === "updateStadium" && isOpen === true) {
    UpdateStadiumForm = (
      <PopupLayout>
        <UpdateStadium stadiumData={stateRef.current} />
      </PopupLayout>
    );
  }

  return (
    <>
      {UpdateStadiumForm}
      <ChildPageLayout title="Stadium Overall">
        <Box>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box padding={3}>
                  <Box display="flex" justifyContent="space-between" mb={3}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className={classes.avatar}
                        src={`/assets/images/adminPics/stadiumPics/icons/${stateRef.current.logo}`}
                        alt={stateRef.current.st_name}
                      />
                      <Box marginLeft="1rem">
                        <Box>
                          <Typography variant="h1">
                            {stateRef.current.st_name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6">
                            {`ມື້ເປີດໃຊ້ງານ: ${moment(
                              stateRef.current.regis_date
                            ).format("DD/MM/YYYY")}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => dispatch(onPopupOpen("updateStadium"))}
                    >
                      ແກ້ໄຂ
                    </Button>
                  </Box>
                  <Divider />
                  <Box mt={3}>
                    <Grid container spacing={3}>
                      <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
                        <ShowDescription data={stateRef.current} />
                      </Grid>
                      <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
                        <ShowAddress data={stateRef.current} />
                      </Grid>
                      <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
                        <ShowFollowers data={stateRef.current} />
                      </Grid>
                      <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
                        <ShowCancelBooking data={stateRef.current} />
                      </Grid>
                      <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
                        <ShowPercentOfBooking data={stateRef.current} />
                      </Grid>
                      <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
                        <ShowDepositTime data={stateRef.current} />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Box>
      </ChildPageLayout>
    </>
  );
});
export default Overall;
