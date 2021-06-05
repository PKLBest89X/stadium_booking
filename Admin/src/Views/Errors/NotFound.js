import React from "react";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import PageLayout from '../../Components/PageLayout'

const useStyles = makeStyles((theme) => ({
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <PageLayout title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/assets/images/errors/404-error.jpg"
            />
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
};

export default NotFoundView;
