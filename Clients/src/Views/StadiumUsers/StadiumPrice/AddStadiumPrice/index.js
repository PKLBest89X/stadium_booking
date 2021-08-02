import React, { useState, useEffect, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchAddStadiumPrice } from "../../../../middlewares/stadiumUser/fetchCRUDStadiumPrice/fetchCRUDStadiumPrice";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import SelectStadiums from "./SelectStadiums";
import SelectTimes from "./SelectTimes";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Divider,
  Card,
  Grid,
  Button,
  TextField,
  Paper,
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

const AddStadiumPrice = React.memo(() => {
  const classes = useStyles();
  const [priceState, setPriceState] = useState({
    stadiums_id: "",
    time_id: "",
    stadiums_price: "",
  });
  const [allPrice, setAllPrice] = useState([]);
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

  const onSelectedStadiums = (payload) => {
    setPriceState((prev) => ({ ...prev, stadiums_id: payload }));
  };

  const onStadiumPriceChange = useCallback((event) => {
    const { name, value } = event.target;
    setPriceState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onMapPriceData = (timeId) => {
    setPriceState((prev) => ({ ...prev, time_id: timeId }));
    const foundData = allPrice.find((items) => items.time_id === timeId);
    if (!foundData) {
      setAllPrice((prev) => [
        ...prev,
        {
          stadiums_id: priceState.stadiums_id,
          time_id: timeId,
          stadiums_price: priceState.stadiums_price,
        },
      ]);
      return;
    }
    setAllPrice(
      allPrice.filter((items) => items.time_id !== foundData.time_id)
    );
  };

  const addStadiumPrice = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const addPriceRequest = {
          stadium_id: stadiumId_Admin,
          allPriceData: allPrice,
        };
        const getAddResult = await dispatch(
          fetchAddStadiumPrice(addPriceRequest)
        );
        const extractResult = unwrapResult(getAddResult);
        if (extractResult.status !== 500) {
          dispatch(onPopupClose());
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, allPrice, stadiumId_Admin]
  );
  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={addStadiumPrice}>
          <Box mb={2}>
            <Typography color="textPrimary" variant="h2">
              ກຳນົດລາຄາເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box mt={3}>
                <div>
                  <Paper>
                    <Box padding="1rem">
                      <Box mb={2}>
                        <Typography variant="h4" color="textSecondary">
                          ເລືອກຕາມສະໜາມ
                        </Typography>
                      </Box>
                      <Divider />
                      <Box mt={3}>
                        <SelectStadiums selectedStadiums={onSelectedStadiums} />
                      </Box>
                    </Box>
                  </Paper>

                  <Box>
                    <TextField
                      fullWidth
                      type="number"
                      margin="normal"
                      label="ລາຄາ - ເປັນກີບ"
                      name="stadiums_price"
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      value={priceState.stadiums_price}
                      onChange={onStadiumPriceChange}
                      variant="outlined"
                      required
                    />
                  </Box>
                  <Box>
                    <Card elevation={10}>
                      <SelectTimes
                        priceState={priceState}
                        selectedPrice={onMapPriceData}
                      />
                    </Card>
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
        </form>
      </Container>
    </div>
  );
});

export default AddStadiumPrice;
