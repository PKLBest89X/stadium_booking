import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import PageLayout from "../../../Components/PageLayout";
import { makeStyles } from "@material-ui/core/styles";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { useHistory } from "react-router-dom";
import StadiumLogo from "./StadiumLogo";
import StadiumPicture from "./StadiumPicture";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { fetchAddStadium } from "../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import {
  Box,
  Button,
  Container,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "3rem",
    [theme.breakpoints.down("xs")]: {
      padding: "2rem .5rem",
    },
  },
  textArea: {
    display: "block",
    width: "100%",
    resize: "vertical",
    padding: ".8em",
    fontSize: "1em",
  },
  picture: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "space-between",
    margin: ".5em auto",
  },
  inputProperties: {
    display: "block",
    width: "100%",
    border: "1px solid #b5aba4",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "5px",
  },
  randowCode: {
    display: "flex",
    alignItems: "center",
    "& > :first-child": {
      marginRight: ".5em",
    },
    "& > :last-child": {
      marginLeft: ".5em",
      padding: "1rem",
    },
  },
}));

const CreateStadium = React.memo(() => {
  const classes = useStyles();
  const { data } = useShallowEqualSelector((state) => state.auth);
  const { stadiumLoading, stadiumFetchSuccess, stadiumError } =
    useShallowEqualSelector((state) => state.stadium);
  const [createStadium, setCreateStatdium] = useState({
    stadium_name: "",
    stadium_description: "",
    config_code: "",
    stadium_village: "",
    stadium_district: "ໄຊເສດຖາ",
    stadium_province: "ນະຄອນຫຼວງວຽງຈັນ",
    stadium_timeCancel: "",
    stadium_deposit: "",
    stadium_logo: null,
    stadium_picture: null,
    phone: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const stadiumLogoFile = useRef(null);
  const stadiumPictureFile = useRef(null);
  const stateRef = useRef(data);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
    }
  }, [stadiumFetchSuccess, dispatch]);
  useMemo(() => {
    data.forEach((items) => {
      return (stateRef.current = items);
    });
  }, [data]);
  useEffect(() => {
    const { st_id, role } = stateRef.current;
    if (st_id !== null && (role === "manager" || role === "staff")) {
      history.push(`/admin/stadium/${st_id}`);
      dispatch(userNow("admin"));
      window.location.reload();
    }
  }, [data, history, stadiumFetchSuccess, dispatch]);

  const onStadiumNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setCreateStatdium((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const onStadiumDesChange = useCallback((event) => {
    const { name, value } = event.target;
    setCreateStatdium((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onRandowConfigCode = useCallback(() => {
    let text = Math.random().toString(36).substring(2, 5);
    setCreateStatdium((prev) => ({ ...prev, config_code: text }));
  }, []);

  const onStadiumVillageChange = useCallback((event) => {
    const { name, value } = event.target;
    setCreateStatdium((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onStadiumTimeCancelChange = useCallback((event) => {
    const { name, value } = event.target;
    setCreateStatdium((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onStadiumDepositChange = useCallback((event) => {
    const { name, value } = event.target;
    setCreateStatdium((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onUploadStadiumLogo = () => {
    const getStadiumLogoFile = stadiumLogoFile.current.files[0];
    setCreateStatdium((prev) => ({
      ...prev,
      stadium_logo: getStadiumLogoFile,
    }));
  };

  const onUploadStadiumPicture = () => {
    const getStadiumPicture = stadiumPictureFile.current.files[0];
    setCreateStatdium((prev) => ({
      ...prev,
      stadium_picture: getStadiumPicture,
    }));
  };

  const onStadiumPhoneChange = useCallback((event) => {
    const { name, value } = event.target;
    setCreateStatdium((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmitNewStadium = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("stadium_name", createStadium.stadium_name);
    formData.append("description", createStadium.stadium_description);
    formData.append("config_code", createStadium.config_code);
    formData.append("village", createStadium.stadium_village);
    formData.append("district", createStadium.stadium_district);
    formData.append("province", createStadium.stadium_province);
    formData.append("time_cancelbooking", createStadium.stadium_timeCancel);
    formData.append("persent_deposit", createStadium.stadium_deposit);
    formData.append("logo", createStadium.stadium_logo);
    formData.append("sampleFile", createStadium.stadium_picture);
    formData.append("phone", createStadium.phone);
    dispatch(fetchAddStadium(formData));
  };

  return (
    <PageLayout title="ສ້າງເດີ່ນຂອງທ່ານ" className={classes.root}>
      <div className={classes.pageContainer}>
        <Container maxWidth="md">
          <form onSubmit={onSubmitNewStadium}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                ສ້າງເດີ່ນ
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                ທ່ານສາມາດຕາມຄວາມສາມາດຂອງເດີ່ນໄດ້ເລີຍ!!
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="ຊື່ເດີ່ນ"
              margin="normal"
              name="stadium_name"
              type="text"
              variant="outlined"
              value={createStadium.statedium_name}
              onChange={onStadiumNameChange}
              required
            />
            <TextareaAutosize
              name="stadium_description"
              className={classes.textArea}
              rows="10"
              placeholder="ປ້ອນຄຳອະທິບາຍເດີ່ນຂອງທ່ານ"
              value={createStadium.statdium_description}
              onChange={onStadiumDesChange}
            />
            <Box mt={2} alignItems="center" className={classes.randowCode}>
              <TextField
                fullWidth
                label="ລະຫັດປະຈຳເດີ່ນ"
                name="config_code"
                type="text"
                variant="outlined"
                inputProps={{ maxLength: 3 }}
                value={createStadium.config_code}
                required
                disabled
              />
              <Button
                color="primary"
                variant="contained"
                onClick={onRandowConfigCode}
              >
                ສຸ່ມ
              </Button>
            </Box>

            <TextField
              fullWidth
              label="ບ້ານ"
              margin="normal"
              name="stadium_village"
              type="text"
              variant="outlined"
              value={createStadium.stadium_village}
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
              value={createStadium.phone}
              onChange={onStadiumPhoneChange}
              required
              InputProps={{
                inputProps: { maxLength: 10, min: 0 },
              }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 8);
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="ເງື່ອນໄຂໄລຍະເວລາ - ຄິດເປັນຊົ່ວໂມງ"
              name="stadium_timeCancel"
              type="number"
              onInput={(e) => {
                e.target.value = Math.max(1, parseInt(e.target.value))
                  .toString()
                  .slice(0, 2);
              }}
              min={1}
              variant="outlined"
              value={createStadium.stadium_timeCancel}
              onChange={onStadiumTimeCancelChange}
            />
            <Box padding="1rem 0">
              <Typography>
                ເປັນການກຳນົດເງື່ອນໄຂຂອບເຂດໄລຍະເວລາເຊັ່ນປ້ອນ 1 ຊົ່ວໂມງ:
              </Typography>
              <Box padding="0 1rem">
                <ul>
                  <li>ໃຊ້ກຳນົດເຊັ່ນ: ຕ້ອງຈອງກ່ອນມາເຕະ 1 ຊົ່ວໂມງ</li>
                  <li>
                    ໃຊ້ກຳນົດເຊັ່ນ: ຕ້ອງຈ່າຍຄ່າມັດຈຳຂອງການຈອງພາຍໃນ 1
                    ຊົ່ວໂມງຫຼັງຈາກການຈອງ
                  </li>
                  <li>
                    ໃຊ້ກຳນົດເຊັ່ນ: ສາມາດຍົກເລີກການຈອງໄດ້ພາຍໃນ 1
                    ຊົ່ວໂມງຫຼັງຈາກການຈອງ
                  </li>
                </ul>
              </Box>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              label="ຄ່າມັດຈຳການຈອງ - ຄິດເປັນເປີເຊັນ"
              name="stadium_deposit"
              type="number"
              onInput={(e) => {
                e.target.value = Math.max(1, parseInt(e.target.value))
                  .toString()
                  .slice(0, 2);
              }}
              min={1}
              variant="outlined"
              value={createStadium.stadium_deposit}
              onChange={onStadiumDepositChange}
            />
            <div className={classes.picture}>
              <span>ໂລໂກ້ຂອງເດີ່ນ</span>
              <StadiumLogo
                className={classes.inputProperties}
                getFile={onUploadStadiumLogo}
                ref={stadiumLogoFile}
                required
              />
            </div>
            <div className={classes.picture}>
              <span>ຮູບຂອງເດີ່ນ</span>
              <StadiumPicture
                className={classes.inputProperties}
                getFile={onUploadStadiumPicture}
                ref={stadiumPictureFile}
                required
              />
            </div>

            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {stadiumLoading === true ? "loading" : "ສ້າງເດີ່ນ"}
              </Button>
            </Box>
            {stadiumError && <p>{stadiumError}</p>}
            {stadiumFetchSuccess && <p>{stadiumFetchSuccess}</p>}
          </form>
        </Container>
      </div>
    </PageLayout>
  );
});

export default CreateStadium;
