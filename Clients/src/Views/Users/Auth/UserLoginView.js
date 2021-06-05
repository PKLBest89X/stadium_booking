import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "../../../Components/PageLayout";
import { fetchLoginUser } from "../../../middlewares/fetchAuth/fetchUser";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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

const AdminLoginView = React.memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const { loading, error } = useShallowEqualSelector((state) => state.auth);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const onEmailLoginChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  const onPasswordLoginChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("accessUserToken"));
    if (isAuth) {
      history.goForward();
    }
  }, [history]);

  return (
    <PageLayout title="User login" className={classes.root}>
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
              dispatch(fetchLoginUser(userLogin));
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
              value={userLogin.email}
              onChange={onEmailLoginChange}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              value={userLogin.password}
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
            </Box>
            <Typography color="textSecondary" variant="body1">
              Don&apos;t have an account? <Link to="/register">ລົງທະບຽນ</Link>
            </Typography>
            {error && <p>{error}</p>}
          </form>
        </Container>
      </Box>
    </PageLayout>
  );
});

export default AdminLoginView;
