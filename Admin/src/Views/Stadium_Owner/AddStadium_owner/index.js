import React, { useCallback, useState, useRef } from "react";
import PageLayout from "../../../Components/PageLayout";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { addStadiumOwner } from "../../../middlewares/fetchStadiumOwner";
import ImageStadiumOwner from "./ImageStadiumOwner";
import { onPopupClose } from "../../../Slices/Features/Popup/popupSlice";
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
  Grid,
  makeStyles,
} from "@material-ui/core";

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

const AddStadiumOwner = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const imageOwnerRef = useRef(null);
  const { loading, error } = useShallowEqualSelector(
    (state) => state.stadiumOwner
  );
  const [addPeople, setAddPeople] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "ຊາຍ",
    email: "",
    password: "",
    image: null,
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/adminProfile/addImage.jpg"
  );
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
  const onEmailChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onPasswordChange = useCallback((event) => {
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
    formData.append("firstName", addPeople.firstName);
    formData.append("lastName", addPeople.lastName);
    formData.append("age", addPeople.age);
    formData.append("gender", addPeople.gender);
    formData.append("email", addPeople.email);
    formData.append("password", addPeople.password);
    formData.append("sampleFile", addPeople.image);
    try {
      await dispatch(addStadiumOwner(formData));
      dispatch(onPopupClose());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="md">
        <form onSubmit={onSubmitAddStadiumAdmin}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ເພີ່ມເຈົ້າຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <ImageStadiumOwner
              ref={imageOwnerRef}
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
                  value={addPeople.email}
                  onChange={onEmailChange}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={addPeople.password}
                  onChange={onPasswordChange}
                />
                <TextField
                  fullWidth
                  label="ຊື່"
                  margin="normal"
                  name="firstName"
                  variant="outlined"
                  value={addPeople.firstName}
                  onChange={onFirstNameChange}
                />
                <TextField
                  fullWidth
                  label="ນາມສະກຸນ"
                  margin="normal"
                  name="lastName"
                  variant="outlined"
                  value={addPeople.lastName}
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
                        value={addPeople.age}
                        onChange={onAgeChange}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <FormLabel component="legend">ເພດ</FormLabel>
                      <RadioGroup
                        name="gender"
                        value={addPeople.gender}
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

          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {loading === true ? "Loading..." : "ເພີ່ມ"}
            </Button>
          </Box>
          {error && <p>{error}</p>}
        </form>
      </Container>
    </div>
  );
});

export default AddStadiumOwner;
