import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";

import { fetchGetAllStadiumOwner } from "../../middlewares/fetchStadiumOwner";

import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";
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

const LatestStadiumOwner = React.memo(({ className, ...rest }) => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { stadiumOwnerData, stadiumOwnerSuccess } = useShallowEqualSelector(
    (state) => state.stadiumOwner
  );

  const sortStadiumOwner = (array) => {
    const getArray = [...array];
    getArray.sort(
      (a, b) => new Date(b["regis_date"]) - new Date(a["regis_date"])
    );
    const newArray = getArray.slice(0, 2);
    return newArray;
  };

  useEffect(() => {
    dispatch(fetchGetAllStadiumOwner());
  }, [dispatch]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${stadiumOwnerData.length} in total`}
        title="ເຈົ້າຂອງເດີ່ນລ້າສຸດ"
        action={
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            onClick={() => history.push("/stadium_owner")}
          >
            ສະແດງທັງໝົດ
          </Button>
        }
      />
      <Divider />
      <List>
        {sortStadiumOwner(stadiumOwnerData).map((items, i) => (
          <ListItem
            divider={i < sortStadiumOwner(stadiumOwnerData).length - 1}
            key={i}
          >
            <ListItemAvatar>
              <Avatar
                alt="ເຈົ້າຂອງເດີ່ນ"
                className={classes.image}
                src={`/assets/images/adminPics/adminProfile/${items.picture}`}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                color="textPrimary"
                noWrap
              >
                {items.su_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`ມື້ເພີ່ມ: ${moment(items.regis_date).format("DD/MM/YYYY")}`}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
});

LatestStadiumOwner.propTypes = {
  className: PropTypes.string,
};

export default LatestStadiumOwner;
