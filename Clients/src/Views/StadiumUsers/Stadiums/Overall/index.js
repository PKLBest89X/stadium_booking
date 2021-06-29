import React, { useEffect, useMemo, useRef } from "react";
import ChildPageLayout from "../../../../Components/ChildPageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadium } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import { onPopupOpen } from '../../../../Slices/Features/Popup/popupSlice';
import ShowAddress from "./ShowAddress";
import ShowDescription from "./ShowDescription";
import ShowFollowers from "./ShowFollowers";
import ShowCancelBooking from "./ShowCancelBooking";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Box, Divider, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateStadium from "./UpdateStadium";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  pictureContainer: {},
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

const Overall = ({ getTabChange, ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumData } = useShallowEqualSelector((state) => state.stadium);
  const { isOpen } = useShallowEqualSelector((state) => state.popup);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const stateRef = useRef(stadiumData);
  const dispatch = useDispatch();

  useEffect(() => getTabChange(0), [getTabChange]);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

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
  if (isOpen === true) {
    UpdateStadiumForm = (
      <PopupLayout>
        <UpdateStadium stadiumData={stateRef.current} />
      </PopupLayout>
    );
  }

  return (
    <>
    {UpdateStadiumForm}
      <ChildPageLayout title="Stadium Overall" {...rest}>
        <Box>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Box padding={3}>
                  <div className={classes.pictureContainer}>
                    <img
                      className={classes.picture}
                      src={`/assets/images/adminPics/stadiumPics/icons/${stateRef.current.logo}`}
                      alt={stateRef.current.st_name}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                <Box padding={3}>
                  <Box display="flex" justifyContent="space-between" mb={3}>
                    <Box>
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

                    <Button color="primary" variant="contained" onClick={() => dispatch(onPopupOpen())}>
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
};
export default Overall;
