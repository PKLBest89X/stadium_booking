import React from "react";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import PageLayout from "../../Components/PageLayout";

const useStyles = makeStyles((theme) => ({
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NoPermission = () => {
  const classes = useStyles();

  return (
    <PageLayout title="No permission">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Box mt={3}>
            <Typography align="center" color="textPrimary" variant="h1">
              401: ທ່ານບໍ່ມີສິດທິໃນການເຂົ້າເຖິງໜ້າຕ່າງນີ້!!
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              ກະລຸນາກັບຄືນສູ່ໜ້າຕ່າງທີ່ເຂົ້າເຖິງໄດ້.
            </Typography>
          </Box>

          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/assets/images/errors/no_Permission.jpg"
            />
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
};

export default NoPermission;
