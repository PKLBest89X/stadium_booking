import React, { useState, useRef, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchAddStadiumDetails } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { unwrapResult } from "@reduxjs/toolkit";
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
import AddStadiumDetailPic from "./AddStadiumDetailPic";

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

const AddStadiumDetails = React.memo(() => {
  const classes = useStyles();
  const imageStadiumsRef = useRef(null);
  const [stadiumState, setStadiumState] = useState({
    stadiumsName: "",
    stadiums_image: null,
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumsAddError } = useShallowEqualSelector(
    (state) => state.stadiumDetails
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

  const onStadiumsNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImageStadiums = imageStadiumsRef.current.files[0];
    if (getImageStadiums) {
      setStadiumState((prev) => ({
        ...prev,
        stadiums_image: getImageStadiums,
      }));
      setTestImage(window.URL.createObjectURL(getImageStadiums));
    } else {
      return;
    }
  };

  const addStadiums = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("st_id", stadiumId_Admin);
      formData.append("std_name", stadiumState.stadiumsName);
      formData.append("sampleFile", stadiumState.stadiums_image);
      try {
        const getAddResult = await dispatch(fetchAddStadiumDetails(formData));
        const extractResult = unwrapResult(getAddResult);
        if (extractResult.status !== 500) {
          dispatch(onPopupClose());
        }
      } catch (err) {
        console.log(err);
      }
    },
    [
      dispatch,
      stadiumState.stadiumsName,
      stadiumId_Admin,
      stadiumState.stadiums_image,
    ]
  );

  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={addStadiums}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ເພີ່ມເດີ່ນເຕະບານ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <AddStadiumDetailPic
              ref={imageStadiumsRef}
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
                      label="ຊື່ສະໜາມ"
                      name="stadiumsName"
                      value={stadiumState.stadiumsName}
                      onChange={onStadiumsNameChange}
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
            {stadiumsAddError ? <p>{stadiumsAddError}</p> : null}
          </Box>
        </form>
      </Container>
    </div>
  );
});

export default AddStadiumDetails;
