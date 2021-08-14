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
          <Box mt={3}>
            <Typography align="center" color="textPrimary" variant="h1">
              404: ໜ້າຕ່າງທີ່ທ່ານຄົ້ນຫາ ແມ່ນບໍ່ມີ!!
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              ທ່ານລອງຄົ້ນຫາທີ່ສິ່ງທ່ານຢາກຄົ້ນໃຫ້ຖືກຕ້ອງດ້ວຍ.
            </Typography>
          </Box>

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
