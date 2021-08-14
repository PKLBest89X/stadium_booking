import React, { useState, useRef, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { fetchUpdateStadium } from "../../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import { updateStadium } from "../../../../../Slices/Features/StadiumUsers/crudStadium/crudStadiumSlice";
import { onPopupClose } from "../../../../../Slices/Features/Popup/popupSlice";
import EditLogo from "./EditLogo";
import EditPicture from "./EditPicture";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Box,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

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
    justifyContent: "center",
    margin: ".5em auto",
  },
  inputProperties: {
    display: "none",
  },
  previewPicture: {
    display: "block",
    width: "100%",
    borderRadius: "0 0 5px 5px",
  },
}));

const UpdateStadium = ({ stadiumData }) => {
  const classes = useStyles();
  const logoRef = useRef(null);
  const pictureRef = useRef(null);
  const [stadiumState, setStadiumState] = useState({
    stadiumId: "",
    stadium_name: "",
    description: "",
    stadium_village: "",
    stadium_district: "ໄຊເສດຖາ",
    stadium_province: "ນະຄອນຫຼວງວຽງຈັນ",
    stadium_timeCancel: "",
    stadium_logo: null,
    stadium_logo_name: "",
    stadium_logo_name_old: "",
    stadium_picture: null,
    stadium_picture_name: "",
    stadium_picture_name_old: "",
    stadium_status: "",
    phone: "",
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const [testImage2, setTestImage2] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setStadiumState((prev) => ({
      ...prev,
      stadiumId: stadiumData.st_id,
      stadium_name: stadiumData.st_name,
      description: stadiumData.description,
      stadium_village: stadiumData.village,
      stadium_timeCancel: stadiumData.time_cancelbooking,
      stadium_logo_name: stadiumData.logo,
      stadium_logo_name_old: stadiumData.logo,
      stadium_picture_name: stadiumData.picture,
      stadium_picture_name_old: stadiumData.picture,
      stadium_status: stadiumData.status,
      phone: stadiumData.phone,
    }));
    setTestImage(
      `/assets/images/adminPics/stadiumPics/icons/${stadiumData.logo}`
    );
    setTestImage2(
      `/assets/images/adminPics/stadiumPics/themeBackground/${stadiumData.picture}`
    );
    return () => {
      setTestImage("/assets/images/postPics/addImage.jpg");
      setTestImage2("/assets/images/postPics/addImage.jpg");
    };
  }, [stadiumData]);

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

  const onStadiumNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const onStadiumDesChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onStadiumVillageChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onStadiumTimeCancelChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onStadiumStatusSelected = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onStadiumPhoneChange = useCallback((event) => {
    const { name, value } = event.target;
    setStadiumState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedLogo = () => {
    const getLogo = logoRef.current.files[0];
    if (getLogo) {
      setStadiumState((prev) => ({
        ...prev,
        stadium_logo: getLogo,
        stadium_logo_name: getLogo.name,
      }));
      setTestImage(window.URL.createObjectURL(getLogo));
    } else {
      return;
    }
  };
  const onSelectedPicture = () => {
    const getPicture = pictureRef.current.files[0];
    if (getPicture) {
      setStadiumState((prev) => ({
        ...prev,
        stadium_picture: getPicture,
        stadium_picture_name: getPicture.name,
      }));
      setTestImage2(window.URL.createObjectURL(getPicture));
    } else {
      return;
    }
  };

  const onUpdateStadium = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("st_id", stadiumState.stadiumId);
    formData.append("st_name", stadiumState.stadium_name);
    formData.append("description", stadiumState.description);
    formData.append("village", stadiumState.stadium_village);
    formData.append("district", stadiumState.stadium_district);
    formData.append("province", stadiumState.stadium_province);
    formData.append("time_cancelbooking", stadiumState.stadium_timeCancel);
    formData.append("logo_pic", stadiumState.stadium_logo_name_old);
    formData.append("picture", stadiumState.stadium_picture_name_old);
    formData.append("logo", stadiumState.stadium_logo);
    formData.append("sampleFile", stadiumState.stadium_picture);
    formData.append("status", stadiumState.stadium_status);
    formData.append("phone", stadiumState.phone);
    dispatch(fetchUpdateStadium(formData))
      .then(() => dispatch(updateStadium(stadiumState)))
      .then(() => dispatch(onPopupClose()));
  };
  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={onUpdateStadium}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ແກ້ໄຂຂໍ້ມູນເດີ່ນ
            </Typography>
          </Box>
          <Divider />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box border="1px solid #b5aba4" mt={2} borderRadius="5px">
                <div className={classes.picture}>
                  <EditLogo
                    ref={logoRef}
                    selected={onSelectedLogo}
                    className={classes.inputProperties}
                  />
                </div>
                <img
                  className={classes.previewPicture}
                  src={testImage}
                  alt="gg"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box border="1px solid #b5aba4" mt={2} borderRadius="5px">
                <div className={classes.picture}>
                  <EditPicture
                    ref={pictureRef}
                    selected={onSelectedPicture}
                    className={classes.inputProperties}
                  />
                </div>
                <img
                  className={classes.previewPicture}
                  src={testImage2}
                  alt="gg2"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                fullWidth
                label="ຊື່ເດີ່ນ"
                margin="normal"
                name="stadium_name"
                type="text"
                variant="outlined"
                value={stadiumState.stadium_name}
                onChange={onStadiumNameChange}
                required
              />
              <div>
                <textarea
                  name="description"
                  className={classes.textarea}
                  rows="10"
                  placeholder="ປ້ອນຄຳອະທິບາຍເດີ່ນຂອງທ່ານ"
                  value={stadiumState.description}
                  onChange={onStadiumDesChange}
                  required
                />
              </div>
              <TextField
                fullWidth
                label="ບ້ານ"
                margin="normal"
                name="stadium_village"
                type="text"
                variant="outlined"
                value={stadiumState.stadium_village}
                onChange={onStadiumVillageChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                name="stadium_district"
                type="text"
                variant="outlined"
                value="ໄຊເສດຖາ"
                disabled
              />
              <TextField
                fullWidth
                margin="normal"
                name="stadium_province"
                type="text"
                variant="outlined"
                value="ນະຄອນຫຼວງວຽງຈັນ"
                disabled
              />
              <TextField
                fullWidth
                label="ເບີໂທ"
                margin="normal"
                name="phone"
                type="number"
                variant="outlined"
                value={stadiumState.phone}
                onChange={onStadiumPhoneChange}
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
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="ໄລຍະເວລາຍົກເລີກການຈອງເດີ່ນ - ຄິດເປັນຊົ່ວໂມງ"
                name="stadium_timeCancel"
                type="number"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 2);
                }}
                min={0}
                variant="outlined"
                value={stadiumState.stadium_timeCancel}
                onChange={onStadiumTimeCancelChange}
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
                  value={stadiumState.stadium_status}
                  onChange={onStadiumStatusSelected}
                  label="ສະຖານະ"
                  inputProps={{
                    name: "stadium_status",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="ດຳເນີນການ">ດຳເນີນການ</option>
                  <option value="ບໍ່ພ້ອມໃຊ້ງານ">ບໍ່ພ້ອມໃຊ້ງານ</option>
                </Select>
              </FormControl>
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
};

export default UpdateStadium;
