import React, { useState, useEffect, useCallback } from "react";
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
import {
  onUpdateSelectedWaterDetails,
  onUpdateQtyWater,
} from "../../../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import { onPopupClose } from "../../../../../../Slices/Features/Popup/popupSlice";

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

const EditWaterPayment = React.memo(({ watersData }) => {
  const classes = useStyles();
  const [drinkState, setDrinkState] = useState({
    stw_id: "",
    stw_name: "",
    stw_price: "",
    stw_picture: "",
    ownQty: "",
    qty: "",
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    watersData.forEach((items) => {
      setDrinkState((prev) => ({
        ...prev,
        stw_id: items.stw_id,
        stw_name: items.stw_name,
        stw_price: items.stw_price,
        stw_picture: items.stw_picture,
        ownQty: items.qty,
      }));
      setTestImage(
        `/assets/images/adminPics/stadiumDrinkPics/${items.stw_picture}`
      );
    });

    return () => setTestImage("/assets/images/postPics/addImage.jpg");
  }, [watersData]);

  const onDrinkQtyChange = useCallback((event) => {
    const { name, value } = event.target;
    setDrinkState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateStadiumDrink = (event) => {
    event.preventDefault();
    dispatch(onUpdateQtyWater(drinkState.qty));
    dispatch(onUpdateSelectedWaterDetails(drinkState));
    dispatch(onPopupClose());
  };

  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="false">
        <form onSubmit={updateStadiumDrink}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ແກ້ໄຂຈຳນວນເຄື່ອງດື່ມ
            </Typography>
          </Box>
          <Divider />
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
                <TextField
                  fullWidth
                  type="text"
                  margin="normal"
                  label="ເຄື່ອງດື່ມ"
                  name="stw_name"
                  value={drinkState.stw_name}
                  disabled
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  type="text"
                  margin="normal"
                  label="ຈຳນວນເກົ່າ"
                  name="own_qty"
                  value={drinkState.ownQty}
                  disabled
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  type="number"
                  margin="normal"
                  label="ຈຳນວນໃໝ່"
                  name="qty"
                  required
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                  value={drinkState.qty}
                  onChange={onDrinkQtyChange}
                  variant="outlined"
                />
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

export default EditWaterPayment;
