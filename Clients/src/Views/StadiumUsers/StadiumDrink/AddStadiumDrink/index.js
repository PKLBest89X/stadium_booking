import React, { useState, useRef, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchAddStadiumDrink } from "../../../../middlewares/stadiumUser/fetchCRUDStadiumDrink/fetchCRUDStadiumDrink";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddStadiumDrinkPic from "./AddStadiumDrinkPic";

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

const AddStadiumDrink = React.memo(() => {
  const classes = useStyles();
  const imageDrinkRef = useRef(null);
  const [drinkState, setDrinkState] = useState({
    drinkName: "",
    drinkPrice: "",
    drinkImage: null,
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { drinkAddError } = useShallowEqualSelector(
    (state) => state.stadiumDrink
  );
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

  const addStadiumDrink = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("st_id", stadiumId_Admin);
    formData.append("stw_name", drinkState.drinkName);
    formData.append("stw_price", drinkState.drinkPrice);
    formData.append("sampleFile", drinkState.drinkImage);
    dispatch(fetchAddStadiumDrink(formData)).then(() => {
      if (drinkAddError === "") {
        dispatch(onPopupClose());
      }
    });
  };

  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={addStadiumDrink}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ເພີ່ມເຄື່ອງດື່ມ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <AddStadiumDrinkPic
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
                      name="drinkPrice"
                      value={drinkState.drinkPrice}
                      onChange={onDrinkPriceChange}
                      variant="outlined"
                      required
                    />
                  </Box>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              ເພີ່ມ
            </Button>
          </Box>
          {drinkAddError ? <p>{drinkAddError}</p> : null}
        </form>
      </Container>
    </div>
  );
});

export default AddStadiumDrink;
