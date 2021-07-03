import React, { useState, useRef, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchUpdateStadiumDetails } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import EditStadiumDetailPic from "./EditStadiumDetailPic";

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

const EditStadiumDetails = React.memo(() => {
  const classes = useStyles();
  const imageStadiumsRef = useRef(null);
  const [stadiumState, setStadiumState] = useState({
    stadiums_id: "",
    stadiumsName: "",
    stadiums_image: null,
    stadiums_image_name: "",
    stadiums_status: "",
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumsDataById, stadiumsEditError } = useShallowEqualSelector(
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

  useEffect(() => {
    stadiumsDataById.forEach((items) => {
      setStadiumState((prev) => ({
        ...prev,
        stadiums_id: items.std_id,
        stadiumsName: items.std_name,
        stadiums_image_name: items.picture,
        stadiums_status: items.std_status,
      }));
      setTestImage(
        `/assets/images/adminPics/stadiumDetailsPics/${items.picture}`
      );
    });
    return () => setTestImage("/assets/images/postPics/addImage.jpg");
  }, [stadiumsDataById, stadiumId_Admin]);

  const onStadiumsNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImageStadiums = imageStadiumsRef.current.files[0];
    if (getImageStadiums) {
      setStadiumState((prev) => ({
        ...prev,
        stadium_postImage: getImageStadiums,
      }));
      setTestImage(window.URL.createObjectURL(getImageStadiums));
    } else {
      return;
    }
  };

  const onStadiumsStatusSelected = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const editStadiums = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("st_id", stadiumId_Admin);
    formData.append("std_id", stadiumState.stadiums_id);
    formData.append("std_name", stadiumState.stadiumsName);
    formData.append("picture", stadiumState.stadiums_image_name);
    formData.append("std_status", stadiumState.stadiums_status);
    formData.append("sampleFile", stadiumState.stadiums_image);
    dispatch(fetchUpdateStadiumDetails(formData)).then(() => {
      if (stadiumsEditError === null) {
        dispatch(onPopupClose());
      }
    });
  };

  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={editStadiums}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ແກ້ໄຂເດີ່ນເຕະບານ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <EditStadiumDetailPic
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
                    <FormControl
                      required
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        ສະຖານະ
                      </InputLabel>
                      <Select
                        native
                        value={stadiumState.stadiums_status}
                        onChange={onStadiumsStatusSelected}
                        label="ສະຖານະ"
                        inputProps={{
                          name: "stadiums_status",
                          id: "outlined-age-native-simple",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value="ພ້ອມໃຊ້ງານ">ພ້ອມໃຊ້ງານ</option>
                        <option value="ບໍ່ພ້ອມໃຊ້ງານ">ບໍ່ພ້ອມໃຊ້ງານ</option>
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

export default EditStadiumDetails;
