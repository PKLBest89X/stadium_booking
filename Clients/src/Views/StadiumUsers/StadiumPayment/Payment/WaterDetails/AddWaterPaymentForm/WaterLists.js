import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
  Typography,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { onHandleClickWaters } from "../../../../../../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice";
import { onMessageClose } from "../../../../../../Slices/Features/Notification/NotificationSlice";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 64,
    height: 64,
    boxShadow: ".5px .5px 3px .5px rgba(0, 0, 0, .5)",
    cursor: "pointer",
  },
  ItemsContainer: {
    transition: "200ms ease-in-out",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "0px 0px 5px 5px",
  },
  cardContent: {
    display: "block",
  },
}));

const WaterLists = React.memo(({ data, indexCount }) => {
  const classes = useStyles();
  const { addQtyWater } = useShallowEqualSelector(
    (state) => state.paymentDetails
  );
  const [checked, setChecked] = useState([-1]);
  const dispatch = useDispatch();
  const { paymentId } = useParams();
  const handleToggle = (payload, value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    let fixData = { ...data, bp_id: paymentId, qty: addQtyWater };
    dispatch(onHandleClickWaters(fixData));
    dispatch(onMessageClose());
  };
  return (
    <div
      className={classes.ItemsContainer}
      onClick={() => handleToggle(data.td_id, indexCount)}
    >
      <Card className={classes.root} elevation={20}>
        <CardMedia
          className={classes.media}
          image={`/assets/images/adminPics/stadiumDrinkPics/${data.stw_picture}`}
          title={data.stw_name}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mt={1}
        >
          <Box paddingLeft="1rem">
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              color="textPrimary"
              noWrap
            >
              {data.stw_name}
            </Typography>
            <NumberFormat
              value={data.stw_price}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" ກີບ"}
              renderText={(value) => (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >{`ລາຄາ: ${value}`}</Typography>
              )}
            />
          </Box>
          <Box>
            <Checkbox
              edge="start"
              onChange={() => handleToggle(data.td_id, indexCount)}
              checked={checked.indexOf(indexCount) !== -1}
              tabIndex={-1}
              disableRipple
              disabled={false}
              inputProps={{ "aria-labelledby": data.td_id }}
            />
          </Box>
        </Box>
      </Card>
    </div>
  );
});

export default WaterLists;
