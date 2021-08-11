import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Card, CardMedia } from "@material-ui/core";
import moment from "moment";

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

}));

const StadiumOwnerCard = ({ getitems }) => {
  const classes = useStyles();
  return (
    <div className={classes.ItemsContainer}>
      <Card className={classes.root} elevation={10}>
        <CardMedia
          className={classes.media}
          image={`/assets/images/adminPics/adminProfile/${getitems.picture}`}
          title={getitems.su_name}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} mt={1}>
          <Box paddingLeft="1rem">
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              color="textPrimary"
              noWrap
            >
              {getitems.su_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`ເພີ່ມເມື່ອ: ${moment(getitems.regis_date).format('DD/MM/YYYY')}`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default StadiumOwnerCard;
