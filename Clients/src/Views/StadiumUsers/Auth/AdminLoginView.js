import React, { useCallback, useState, useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { fetchLoginAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { history } from '../../../Components/history';
import { fetchAuthAdmin } from '../../../middlewares/fetchAuth/fetchStadiumUsers'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
  },
}));

const AdminLoginView = () => {
  const classes = useStyles();
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { data, loading, error } = useShallowEqualSelector((state) => state.auth);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
    }
  }, [dispatch]);
  useEffect(() => {
    data.slice(-1).forEach(({st_id, role}) => {
      if (role === "manager") {
        history.push(`/admin/stadium/${st_id}`);
        window.location.reload();
      }
    });
  }, [data]);

  const onEmailLoginChange = useCallback((event) => {
    const { name, value } = event.target;
    setAdminLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  const onPasswordLoginChange = useCallback((event) => {
    const { name, value } = event.target;
    setAdminLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  return (
    <PageLayout title="Admin login" className={classes.root}>
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
              dispatch(fetchLoginAdmin(adminLogin));
            }}
          >
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              value={adminLogin.email}
              onChange={onEmailLoginChange}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              value={adminLogin.password}
              onChange={onPasswordLoginChange}
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

export default AdminLoginView;
