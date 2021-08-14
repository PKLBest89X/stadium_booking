import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Button,
  Box,
  Card,
  CardHeader,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory, useParams } from "react-router-dom";
import NonBookingUnpaid from "./NonBookingUnpaid";

import { fetchBookingListDetailsNonAccount } from "../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";

import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    height: 48,
    width: 48,
  },
});

const LastReserves = React.memo(({ className, ...rest }) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { stadiumId_Admin } = useParams();
  const {
    preBookingNonAccountDetailsData,
    preBookingNonAccountDetailsSuccess,
  } = useShallowEqualSelector((state) => state.preBookingNonAccount);

  useEffect(() => {
    dispatch(fetchBookingListDetailsNonAccount(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const sortStadiumOwner = (array) => {
    const getArray = [...array];
    getArray.sort(
      (a, b) => new Date(b["regis_date"]) - new Date(a["regis_date"])
    );
    const newArray = getArray.slice(0, 2);
    return newArray;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${preBookingNonAccountDetailsData.length} in total`}
        title="ການຈອງທີ່ຍັງບໍ່ໄດ້ຊຳລະ"
        action={
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            onClick={() =>
              history.push(`/admin/stadium/${stadiumId_Admin}/stadium-booking`)
            }
          >
            ສະແດງທັງໝົດ
          </Button>
        }
      />
      <Divider />
      {preBookingNonAccountDetailsSuccess === true && (
        <List>
          {sortStadiumOwner(preBookingNonAccountDetailsData).map((items, i) => (
            <ListItem
              divider={
                i < sortStadiumOwner(preBookingNonAccountDetailsData).length - 1
              }
              key={i}
            >
              <ListItemAvatar>
                <Avatar
                  className={classes.image}
                  src={`/assets/images/usersPics/usersProfile/${items.profile}`}
                />
              </ListItemAvatar>
              <ListItemText>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="h2"
                      color="textPrimary"
                      noWrap
                    >
                      {items.c_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`ມື້ຈອງ: ${moment(items.kickoff_date).format(
                        "DD/MM/YYYY"
                      )}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`${items.td_start.slice(
                        0,
                        2
                      )} ໂມງ - ${items.td_end.slice(0, 2)} ໂມງ`}
                    </Typography>
                  </Box>
                </Box>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
      {preBookingNonAccountDetailsSuccess === false && <NonBookingUnpaid />}
    </Card>
  );
});

LastReserves.propTypes = {
  className: PropTypes.string,
};

export default LastReserves;
