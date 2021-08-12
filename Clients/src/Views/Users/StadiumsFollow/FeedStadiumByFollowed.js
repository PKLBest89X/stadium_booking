import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box, colors } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Card, CardMedia } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import moment from "moment";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
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
  paid: {
    color: colors.green[900],
    width: 20,
    height: 20,
  },
}));

const FeedStadiumByFollowed = ({ getitems }) => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div
      className={classes.ItemsContainer}
      onClick={() => history.push(`/stadium/${getitems.st_id}`)}
    >
      <Card className={classes.root} elevation={10}>
        <CardMedia
          className={classes.media}
          image={`/assets/images/adminPics/stadiumPics/icons/${getitems.logo}`}
          title={getitems.st_name}
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
              {getitems.st_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`ຍອດຕິດຕາມ: ${getitems.follow_count} ຄົນ`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" marginRight="1rem">
            <CheckIcon className={classes.paid} />
            <Typography variant="h6" color="textSecondary">
              ຕິດຕາມແລ້ວ
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default FeedStadiumByFollowed;
