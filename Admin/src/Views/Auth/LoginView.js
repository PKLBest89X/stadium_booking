import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import PageLayout from "../../Components/PageLayout";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../Components/useShallowEqualSelector";
import { fetchLoginSuperAdmin } from "../../middlewares/fetchAuth";
import { fetchAuthSuperAdmin } from "../../middlewares/fetchAuth";
import { useHistory } from "react-router-dom";
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

const LoginView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { data, loading, error } = useShallowEqualSelector(
    (state) => state.auth
  );
  const stateRef = useRef(data);

  useEffect(() => {
    const superAdminToken = JSON.parse(localStorage.getItem("accessSuperAdminToken"));
    if (superAdminToken && superAdminToken.token) {
      dispatch(fetchAuthSuperAdmin(superAdminToken.token));
    }
  }, [dispatch]);
  useMemo(() => {
    data.forEach((items) => {
      return (stateRef.current = items);
    });
  }, [data]);
  useEffect(() => {
    const { role } = stateRef.current;
    if (role === "admin") {
      history.push(`/`);
      window.location.reload();
    }
  }, [data, dispatch, history]);

  const onEmailLoginChange = useCallback((event) => {
    const { name, value } = event.target;
    setAdminLogin((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onPasswordLoginChange = useCallback((event) => {
    const { name, value } = event.target;
    setAdminLogin((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <PageLayout title="Admin login" className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(fetchLoginSuperAdmin(adminLogin));
            }}
          >
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                ເຂົ້າສູ່ລະບົບ
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                ປ້ອນຂໍ້ມູນເພື່ອເຂົ້າສູ່ລະບົບຂອງທ່ານ.
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
                {loading === true ? "loading" : "Login"}
              </Button>
              {error && <p>{error}</p>}
            </Box>
          </form>
        </Container>
      </Box>
    </PageLayout>
  );
};

export default LoginView;
