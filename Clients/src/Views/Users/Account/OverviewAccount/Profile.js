import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 150,
    width: 150,
  },
  hidden: {
    display: "none",
  },
}));

const Profile = forwardRef(({ profile, pic, selected, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={pic} />
          <Typography className={classes.name} color="textPrimary" variant="h4">
            {profile.c_name}
          </Typography>

          <Typography color="textSecondary" variant="body2">
            {profile.c_email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Box padding=".5rem" display="block" justifyContent="center">
        <input
          className={classes.hidden}
          type="file"
          multiple
          accept="image/*"
          id="contained-button-file"
          onChange={selected}
          ref={ref}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
          >
            upload ຮູບໃໝ່
          </Button>
        </label>
      </Box>
    </Card>
  );
});

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
