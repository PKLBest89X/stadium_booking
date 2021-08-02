import React, { useState, useRef, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchUpdateStadiumDrink } from "../../../../middlewares/stadiumUser/fetchCRUDStadiumDrink/fetchCRUDStadiumDrink";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import EditStadiumDrinkPic from "./EditStadiumDrinkPic";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  textarea: {
    display: "block",
    width: "100%",
    fontSize: "1em",
    padding: "1em",
    resize: "vertical",
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

const EditStadiumDrink = React.memo(() => {
  const classes = useStyles();
  const imageDrinkRef = useRef(null);
  const [drinkState, setDrinkState] = useState({
    drinkId: "",
    drinkName: "",
    drinkPrice: "",
    drinkImage: null,
    drink_image_name: "",
    drink_status: "",
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { drinksData } = useShallowEqualSelector((state) => state.stadiumDrink);
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

  useEffect(() => {
    drinksData.forEach((items) => {
      setDrinkState((prev) => ({
        ...prev,
        drinkId: items.stw_id,
        drinkName: items.stw_name,
        drinkPrice: items.stw_price,
        drink_image_name: items.stw_picture,
        drink_status: items.stw_status,
      }));
      setTestImage(
        `/assets/images/adminPics/stadiumDrinkPics/${items.stw_picture}`
      );
    });
    return () => setTestImage("/assets/images/postPics/addImage.jpg");
  }, [drinksData, stadiumId_Admin]);

  const onDrinkNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setDrinkState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onDrinkPriceChange = useCallback((event) => {
    const { name, value } = event.target;
    setDrinkState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImageDrink = imageDrinkRef.current.files[0];
    if (getImageDrink) {
      setDrinkState((prev) => ({ ...prev, drinkImage: getImageDrink }));
      setTestImage(window.URL.createObjectURL(getImageDrink));
    } else {
      return;
    }
  };

  const onDrinkStatusSelected = useCallback((event) => {
    const { name, value } = event.target;
    setDrinkState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateStadiumDrink = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("st_id", stadiumId_Admin);
    formData.append("stw_id", drinkState.drinkId);
    formData.append("stw_name", drinkState.drinkName);
    formData.append("stw_picture", drinkState.drink_image_name);
    formData.append("stw_price", drinkState.drinkPrice);
    formData.append("stw_status", drinkState.drink_status);
    formData.append("sampleFile", drinkState.drinkImage);
    dispatch(fetchUpdateStadiumDrink(formData)).then(() =>
      dispatch(onPopupClose())
    );
  };

  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={updateStadiumDrink}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ແກ້ໄຂເຄື່ອງດື່ມ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <EditStadiumDrinkPic
              ref={imageDrinkRef}
              selected={onSelectedImage}
              className={classes.inputProperties}
            />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box border="1px solid #b5aba4" mt={2} borderRadius="5px">
                <img
                  className={classes.previewPicture}
                  src={testImage}
                  alt="gg"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box>
                <div>
                  <Box>
                    <TextField
                      fullWidth
                      type="text"
                      margin="normal"
                      label="ຊື່ເຄື່ອງດື່ມ"
                      name="drinkName"
                      value={drinkState.drinkName}
                      onChange={onDrinkNameChange}
                      variant="outlined"
                      required
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      type="number"
                      margin="normal"
                      label="ລາຄາ - ເປັນກີບ"
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      name="drinkPrice"
                      value={drinkState.drinkPrice}
                      onChange={onDrinkPriceChange}
                      variant="outlined"
                      required
                    />
                  </Box>
                  <Box>
                    <FormControl
                      required
                      fullWidth
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        ສະຖານະ
                      </InputLabel>
                      <Select
                        native
                        value={drinkState.drink_status}
                        onChange={onDrinkStatusSelected}
                        label="ສະຖານະ"
                        inputProps={{
                          name: "drink_status",
                          id: "outlined-age-native-simple",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value="ຂາຍໄດ້">ຂາຍໄດ້</option>
                        <option value="ບໍ່ຂາຍ">ບໍ່ຂາຍ</option>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              ແກ້ໄຂ
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
});

export default EditStadiumDrink;
