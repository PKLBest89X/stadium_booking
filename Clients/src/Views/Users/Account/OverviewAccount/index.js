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
import { useHistory } from "react-router-dom";
import {
  onPopupClose,
  onPopupOpen,
} from "../../../../Slices/Features/Popup/popupSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../middlewares/fetchAuth/fetchUser";
import { fetchUpdateUserProfile } from "../../../../middlewares/fetchAuth/fetchUser";

import PopupLayout from "../../../../Components/PopupLayout";
import NotificationAlert from "../../../../Components/NotificationAlert";
import UpdatePassword from "../UpdatePassword";

import { unwrapResult } from "@reduxjs/toolkit";

import {
  Box,
  Button,
  Container,
  TextField,
  Divider,
  Typography,
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Card,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Profile from "./Profile";
import { onNotiOpen } from "../../../../Slices/Features/Notification/NotificationSlice";

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

const OverviewAccount = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useShallowEqualSelector((state) => state.auth);
  const stateRef = useRef(data);

  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  let history = useHistory();
  const imageOwnerRef = useRef(null);
  const [addPeople, setAddPeople] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    prevImage: "",
    image: null,
  });
  const [testImage, setTestImage] = useState("");

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  useMemo(() => data.forEach((items) => (stateRef.current = items)), [data]);

  useEffect(() => {
    setAddPeople((prev) => ({
      ...prev,
      firstName: stateRef.current.c_name,
      lastName: stateRef.current.c_surname,
      email: stateRef.current.c_email,
      tel: stateRef.current.c_phone,
      prevImage: stateRef.current.profile
    }));
    setTestImage(
      `/assets/images/usersPics/usersProfile/${stateRef.current.profile}`
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
  const onTelChange = useCallback((event) => {
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

  const onUserLogout = () => {
    dispatch(userLogOut());
    dispatch(userNow("quest"));
    history.push("/");
  };

  const onSubmitAddStadiumAdmin = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("c_name", addPeople.firstName);
    formData.append("c_surname", addPeople.lastName);
    formData.append("c_phone", addPeople.tel);
    formData.append("profile", addPeople.prevImage);
    formData.append("sampleFile", addPeople.image);
    try {
      const requestData = await dispatch(fetchUpdateUserProfile(formData));
      const getResponse = unwrapResult(requestData);
      if (getResponse) {
        dispatch(onPopupClose());
        dispatch(onNotiOpen("successUpdateProfile"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let updatePassword = null;
  if (popupName === "updatePassword" && isOpen === true) {
    updatePassword = (
      <PopupLayout customHeight={true}>
        <UpdatePassword />
      </PopupLayout>
    );
  }

  let alertSuccesUpdateProfile = null;
  if (notiName === "successUpdateProfile" && notiState === true) {
    alertSuccesUpdateProfile = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ທ່ານແກ້ໄຂບັນຊີສຳເລັດ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  let alertSuccesUpdatePassword = null;
  if (notiName === "successUpdatePassword" && notiState === true) {
    alertSuccesUpdatePassword = (
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
      {updatePassword}
      {alertSuccesUpdateProfile}
      {alertSuccesUpdatePassword}
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
                  onClick={onUserLogout}
                >
                  logout
                </Button>
              </Box>
              <Divider />
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Profile
                      ref={imageOwnerRef}
                      profile={stateRef.current}
                      pic={testImage}
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
                        <TextField
                          fullWidth
                          label="ເບີໂທ"
                          margin="normal"
                          name="tel"
                          type="number"
                          variant="outlined"
                          value={addPeople.tel || ""}
                          required
                          InputProps={{
                            inputProps: { maxLength: 10, min: 0 },
                          }}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 8);
                          }}
                          onChange={onTelChange}
                        />
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
                              dispatch(onPopupOpen("updatePassword"))
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

export default OverviewAccount;
