import React, { useState, useRef, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchAddEmployee } from "../../../../middlewares/stadiumUser/fetchCRUDEmployee/fetchCRUDEmployee";
import { onPopupClose } from '../../../../Slices/Features/Popup/popupSlice';
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import ImageEmployee from "./ImageEmployee";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  picture: {
    display: "flex",
    justifyContent: "flex=start",
    margin: ".5em auto",
  },
  inputProperties: {
    display: "none",
  },
  previewPicture: {
    display: "block",
    width: "100%",
    borderRadius: "5px",
  },
}));

const AddEmployee = () => {
  const classes = useStyles();
  const imageEmployeeRef = useRef(null);
  const [employeeState, setEmployeeState] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "ຊາຍ",
    email: "",
    password: "",
    employee_image: null,
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

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

  const onFirstNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onLastNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onAgeChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onGenderChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onEmailChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onPasswordChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImageEmployee = imageEmployeeRef.current.files[0];
    if (getImageEmployee) {
      setEmployeeState((prev) => ({
        ...prev,
        employee_image: getImageEmployee,
      }));
      setTestImage(window.URL.createObjectURL(getImageEmployee));
    } else {
      return;
    }
  };

  const onSubmitAddEmployee = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("stadiumId", stadiumId_Admin);
    formData.append("firstName", employeeState.firstName);
    formData.append("lastName", employeeState.lastName);
    formData.append("age", employeeState.age);
    formData.append("gender", employeeState.gender);
    formData.append("email", employeeState.email);
    formData.append("password", employeeState.password);
    formData.append("sampleFile", employeeState.employee_image);
    dispatch(fetchAddEmployee(formData)).then(() => dispatch(onPopupClose()));
  };
  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={onSubmitAddEmployee}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ເພີ່ມພະນັກງານເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <ImageEmployee
              ref={imageEmployeeRef}
              selected={onSelectedImage}
              className={classes.inputProperties}
            />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box border="1px solid #b5aba4" mb={2} mt={2} borderRadius="5px">
                <img
                  className={classes.previewPicture}
                  src={testImage}
                  alt="gg"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={employeeState.email}
                  onChange={onEmailChange}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={employeeState.password}
                  onChange={onPasswordChange}
                />
                <TextField
                  fullWidth
                  label="ຊື່"
                  margin="normal"
                  name="firstName"
                  variant="outlined"
                  value={employeeState.firstName}
                  onChange={onFirstNameChange}
                />
                <TextField
                  fullWidth
                  label="ນາມສະກຸນ"
                  margin="normal"
                  name="lastName"
                  variant="outlined"
                  value={employeeState.lastName}
                  onChange={onLastNameChange}
                />
                <Box marginTop="1em">
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={8} md={8} lg={8} xl={8}>
                      <TextField
                        fullWidth
                        label="ອາຍຸ"
                        name="age"
                        type="number"
                        InputLabelProps={{ maxLength: 10 }}
                        variant="outlined"
                        value={employeeState.age}
                        onChange={onAgeChange}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <FormLabel component="legend">ເພດ</FormLabel>
                      <RadioGroup
                        name="gender"
                        value={employeeState.gender}
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
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              ເພີ່ມ
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default AddEmployee;
