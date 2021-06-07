import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { makeStyles } from "@material-ui/core/styles";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { history } from "../../../Components/history";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
  },
}));

const CreateStadium = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading, error } = useShallowEqualSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
    }
  }, [dispatch]);
  useEffect(() => {
    data.slice(-1).forEach(({ st_id, role }) => {
      if (role === "manager") {
        history.push(`/admin/stadium/${st_id}`);
        window.location.reload();
      }
    });
  }, [data]);
  return (
    <PageLayout title="ສ້າງເດີ່ນຂອງທ່ານ" className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                ສ້າງເດີ່ນ
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                ທ່ານສາມາດຕາມຄວາມສາມາດຂອງເດີ່ນໄດ້ເລີຍ!!
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {loading === true ? "loading" : "Sign in now"}
              </Button>
              {error && <p>{error}</p>}
            </Box>
          </form>
        </Container>
      </Box>
    </PageLayout>
  );
};

export default CreateStadium;
