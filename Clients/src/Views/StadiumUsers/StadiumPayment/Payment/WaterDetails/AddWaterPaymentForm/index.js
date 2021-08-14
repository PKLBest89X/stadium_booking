import React, { useCallback, useEffect } from "react";
import WaterLists from "./WaterLists";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputBase,
  Paper,
  IconButton,
  Typography,
  Divider,
  Card,
  TextField,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import {
  onSaveSelectedWater,
  onAddQtyWater,
} from "../../../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { onPopupClose } from "../../../../../../Slices/Features/Popup/popupSlice";
import { onMessageOpen } from "../../../../../../Slices/Features/Notification/NotificationSlice";

import NonDrink from "./NonDrink";

const useStyles = makeStyles((theme) => ({
  toolbarLayout: {
    position: "sticky",
    top: 0,
    left: 0,
    padding: "1rem",
    zIndex: 2,
    [theme.breakpoints.down(350)]: {
      padding: "1rem .5rem",
    },
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none",
    backgroundColor: "#CDCDCD",
  },
  toolbarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    "& > :first-child": {
      display: "flex",
      alignItems: "center",
    },

    "& > :last-child": {
      "& > button": {},
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  layoutContainer: {
    padding: "2em",
  },
  contentContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gridGap: "1em",
  },
  textColor: {
    color: "red",
  },
}));

const AddWaterPayment = React.memo(({ watersData }) => {
  const classes = useStyles();
  const { waterSelecting } = useShallowEqualSelector(
    (state) => state.paymentDetails
  );
  const { addQtyWater } = useShallowEqualSelector((state) => state.getDrinks);
  const dispatch = useDispatch();

  const { messageAlert, messageState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const onSaveQtyWater = useCallback(
    async (event) => {
      event.preventDefault();
      if (waterSelecting.length > 0) {
        dispatch(onSaveSelectedWater(waterSelecting));
        dispatch(onPopupClose());
      } else {
        await dispatch(onMessageOpen("emptySelectedWater"));
      }
    },
    [dispatch, waterSelecting]
  );

  let alertEmptySelectedWater = null;
  if (messageAlert === "emptySelectedWater" && messageState === true) {
    alertEmptySelectedWater = (
      <Box display="flex" alignItems="center">
        <Typography
          className={classes.textColor}
          variant="h5"
          color="secondary"
        >
          ເລືອກເຄື່ອງດື່ມກັນ!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box mb={3}>
        <Box mb={2}>
          <Typography color="textPrimary" variant="h2">
            ລາຍການເຄື່ອງດື່ມ
          </Typography>
        </Box>
        <Divider />
      </Box>
      {watersData.length > 0 ? (
        <>
          <Card elevation={10} className={classes.toolbarLayout}>
            <div className={classes.toolbarContainer}>
              <Box>
                <form onSubmit={onSaveQtyWater}>
                  <TextField
                    variant="standard"
                    type="number"
                    label="ຈຳນວນ"
                    required
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                    name="getMoney"
                    value={addQtyWater}
                    onChange={(event) =>
                      dispatch(onAddQtyWater(event.target.value))
                    }
                  />
                  <IconButton type="submit">
                    <AddIcon />
                  </IconButton>
                  {alertEmptySelectedWater}
                </form>
              </Box>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="ຄົ້ນຫາ..."
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </Card>
          <Box mt={3}>
            <div className={classes.contentContainer}>
              {watersData.map((items, index) => {
                return (
                  <WaterLists data={items} key={index} indexCount={index} />
                );
              })}
            </div>
          </Box>
        </>
      ) : (
        <NonDrink />
      )}
    </>
  );
});

export default AddWaterPayment;
