import React, { useEffect, useMemo, useRef } from "react";
import PageLayout from "../../../Components/PageLayout";
import { makeStyles } from "@material-ui/core/styles";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { useHistory } from "react-router-dom";
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
    "& > TextField": {
      maxWith: "400px",
    },
  },
}));

const CreateStadium = () => {
  const classes = useStyles();
  const { data, loading, error } = useShallowEqualSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const stateRef = useRef(data);
  // const logoRef = useRef(null);
  // const pictureRef = useRef(null);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
    }
  }, [dispatch]);
  useMemo(() => {
    data.forEach((items) => {
      return (stateRef.current = items);
    });
  }, [data]);
  useEffect(() => {
    const { st_id, role } = stateRef.current;
    if (st_id !== null && role === "manager") {
      history.push(`/admin/stadium/${st_id}`);
    }
  }, [data, history]);
  return (
    <PageLayout title="ສ້າງເດີ່ນຂອງທ່ານ" className={classes.root}>
      <div className={classes.pageContainer}>
        <Container maxWidth="md">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
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
              required
            />
            <TextareaAutosize
              name="statdium_description"
              className={classes.textArea}
              rows="10"
              placeholder="ປ້ອນຄຳອະທິບາຍເດີ່ນຂອງທ່ານ"
            />
            <TextField
              fullWidth
              label="ເລກລະຫັດປະຈຳເດີ່ນບໍ່ເກີນ 3 ຕົວອັກສອນ"
              margin="normal"
              name="config_code"
              type="text"
              variant="outlined"
              inputProps={{ maxLength: 3 }}
              required
            />
            <TextField
              fullWidth
              label="ບ້ານ"
              margin="normal"
              name="stadium_village"
              type="text"
              variant="outlined"
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
            />
            <div className={classes.picture}>
              <span>ໂລໂກ້ຂອງເດີ່ນ</span>
              <TextField
                margin="normal"
                name="stadium_logo"
                type="file"
                variant="outlined"
              />
            </div>
            <div className={classes.picture}>
              <span>ຮູບຂອງເດີ່ນ</span>
              <TextField
                margin="normal"
                name="stadium_picture"
                type="file"
                variant="outlined"
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
                {loading === true ? "loading" : "ສ້າງເດີ່ນ"}
              </Button>
              {error && <p>{error}</p>}
            </Box>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default CreateStadium;
