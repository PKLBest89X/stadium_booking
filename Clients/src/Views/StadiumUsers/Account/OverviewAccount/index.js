import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import PageLayout from "../../../../Components/PageLayout";
import {
  userNow,
  userLogOut,
} from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  onPopupClose,
  onPopupOpen,
} from "../../../../Slices/Features/Popup/popupSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchUpdateUserProfileAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";

import PopupLayout from "../../../../Components/PopupLayout";
import NotificationAlert from "../../../../Components/NotificationAlert";
import UpdatePassword from "../UpdatePassword";
import { onNotiOpen } from "../../../../Slices/Features/Notification/NotificationSlice";

import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Container,
  TextField,
  Divider,
  Typography,
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Card,
  FormControl,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Profile from "./Profile";
import { adminLogOut } from "../../../../Slices/Authentication/authSlice";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  picture: {
    display: "flex",
    justifyContent: "flex-start",
    margin: ".5em auto",
  },
  inputProperties: {
    display: "none",
  },
}));

const OverviewAccountAdmin = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { data } = useShallowEqualSelector((state) => state.auth);
  const stateRef = useRef(data);

  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const { stadiumId_Admin } = useParams();
  let history = useHistory();
  const imageOwnerRef = useRef(null);
  const [addPeople, setAddPeople] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "ຊາຍ",
    email: "",
    prevImage: "",
    image: null,
  });
  const [testImage, setTestImage] = useState("");

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

  useMemo(() => data.forEach((items) => (stateRef.current = items)), [data]);

  useEffect(() => {
    setAddPeople((prev) => ({
      ...prev,
      firstName: stateRef.current.su_name,
      lastName: stateRef.current.su_surname,
      email: stateRef.current.su_email,
      gender: stateRef.current.su_gender,
      age: stateRef.current.su_age,
      prevImage: stateRef.current.picture,
    }));
    setTestImage(
      `/assets/images/adminPics/adminProfile/${stateRef.current.picture}`
    );
  }, [data]);

  const onFirstNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onLastNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onAgeChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onGenderChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImageOwner = imageOwnerRef.current.files[0];
    if (getImageOwner) {
      setAddPeople((prev) => ({
        ...prev,
        image: getImageOwner,
      }));
      setTestImage(window.URL.createObjectURL(getImageOwner));
    } else {
      return;
    }
  };

  const onSubmitAddStadiumAdmin = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("su_name", addPeople.firstName);
    formData.append("su_surname", addPeople.lastName);
    formData.append("su_age", addPeople.age);
    formData.append("su_gender", addPeople.gender);
    formData.append("picture", addPeople.prevImage);
    formData.append("sampleFile", addPeople.image);
    try {
      const requestData = await dispatch(fetchUpdateUserProfileAdmin(formData));
      const getResponse = unwrapResult(requestData);
      if (getResponse) {
        dispatch(onPopupClose());
        dispatch(onNotiOpen("successUpdateProfileAdmin"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let updatePasswordAdmin = null;
  if (popupName === "updatePasswordAdmin" && isOpen === true) {
    updatePasswordAdmin = (
      <PopupLayout customHeight={true}>
        <UpdatePassword />
      </PopupLayout>
    );
  }

  let alertSuccesUpdateProfileAdmin = null;
  if (notiName === "successUpdateProfileAdmin" && notiState === true) {
    alertSuccesUpdateProfileAdmin = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ທ່ານແກ້ໄຂບັນຊີສຳເລັດ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  let alertSuccesUpdatePasswordAdmin = null;
  if (notiName === "successUpdatePasswordAdmin" && notiState === true) {
    alertSuccesUpdatePasswordAdmin = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ທ່ານໄດ້ປ່ຽນລະຫັດໃໝ່ແລ້ວ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {updatePasswordAdmin}
      {alertSuccesUpdateProfileAdmin}
      {alertSuccesUpdatePasswordAdmin}
      <PageLayout title="My account" {...rest}>
        <div className={classes.pageContainer}>
          <Container maxWidth="lg">
            <form onSubmit={onSubmitAddStadiumAdmin}>
              <Box
                mb={3}
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="textSecondary" variant="h2">
                  ບັນຊີຂອງຂ້ອຍ
                </Typography>
                <Button
                  startIcon={<ExitToAppIcon />}
                  color="primary"
                  onClick={() => {
                    dispatch(adminLogOut());
                  }}
                >
                  logout
                </Button>
              </Box>
              <Divider />
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Profile
                      profile={stateRef.current}
                      pic={testImage}
                      ref={imageOwnerRef}
                      selected={onSelectedImage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Card>
                      <Box
                        padding="1rem"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography color="textSecondary" variant="h5">
                          ລາຍລະອຽດບັນຊີ
                        </Typography>
                      </Box>
                      <Divider />
                      <Box padding="1rem">
                        <TextField
                          fullWidth
                          label="ຊື່"
                          margin="normal"
                          name="firstName"
                          variant="outlined"
                          value={addPeople.firstName || ""}
                          onChange={onFirstNameChange}
                          required
                        />
                        <TextField
                          fullWidth
                          label="ນາມສະກຸນ"
                          margin="normal"
                          name="lastName"
                          variant="outlined"
                          value={addPeople.lastName || ""}
                          onChange={onLastNameChange}
                          required
                        />
                        <Box marginTop="1em" mb={2}>
                          <Grid container spacing={3}>
                            <Grid item xs={6} sm={8} md={8} lg={8} xl={8}>
                              <TextField
                                fullWidth
                                label="ອາຍຸ"
                                name="age"
                                type="number"
                                InputProps={{
                                  inputProps: { maxLength: 10, min: 0 },
                                }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 2);
                                }}
                                variant="outlined"
                                value={addPeople.age || ""}
                                onChange={onAgeChange}
                                required
                              />
                            </Grid>

                            <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">ເພດ</FormLabel>
                                <RadioGroup
                                  name="gender"
                                  aria-label="gender1"
                                  value={addPeople.gender || ""}
                                  onChange={onGenderChange}
                                >
                                  <Box display="flex">
                                    <FormControlLabel
                                      value="ຊາຍ"
                                      control={<Radio />}
                                      label="ຊາຍ"
                                    />
                                    <FormControlLabel
                                      value="ຍິງ"
                                      control={<Radio />}
                                      label="ຍິງ"
                                    />
                                  </Box>
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      <Divider />
                      <Box
                        padding=".5rem"
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Box marginRight=".5rem">
                          <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                          >
                            ແກ້ໄຂ profile
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                              dispatch(onPopupOpen("updatePasswordAdmin"))
                            }
                          >
                            ປ່ຽນລະຫັດຜ່ານ
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Container>
        </div>
      </PageLayout>
    </>
  );
});

export default OverviewAccountAdmin;
