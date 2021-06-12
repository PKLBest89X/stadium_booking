import React, { useCallback, useState } from "react";
import PageLayout from "../../../Components/PageLayout";
import { Link } from "react-router-dom";
import { useShallowEqualSelector } from '../../../Components/useShallowEqualSelector';
import { useDispatch } from 'react-redux';
import { fetchRegisterUser } from '../../../middlewares/fetchAuth/fetchRegisterUser';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const UserRegisterView = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error } = useShallowEqualSelector(state => state.registerUser);
  const [userRegis, setUserRegis] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const onFirstNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserRegis((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onLastNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserRegis((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onPhoneChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserRegis((prev) => ({ ...prev, [name]: value }));
  }, []);
  const onEmailChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserRegis((prev) => ({ ...prev, [name]: value }))
  }, []);
  const onPasswordChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserRegis((prev) => ({ ...prev, [name]: value }));
  }, []);
  return (
    <PageLayout title="Register user" className={classes.root}>
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
              dispatch(fetchRegisterUser(userRegis))
            }}
          >
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="First name"
              margin="normal"
              name="firstName"
              variant="outlined"
              value={userRegis.firstName}
              onChange={onFirstNameChange}
            />
            <TextField
              fullWidth
              label="Last name"
              margin="normal"
              name="lastName"
              variant="outlined"
              value={userRegis.lastName}
              onChange={onLastNameChange}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              name="phone"
              type="number"
              variant="outlined"
              value={userRegis.phone}
              onChange={onPhoneChange}
            />
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              value={userRegis.email}
              onChange={onEmailChange}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              value={userRegis.password}
              onChange={onPasswordChange}
            />

            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {loading === true ? 'Loading...' : 'Sign up now'}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Have an account?{" "}
              <Link to="/login" variant="h6">
                Sign in
              </Link>
            </Typography>
            {error && <p>{error}</p>}
          </form>
        </Container>
      </Box>
    </PageLayout>
  );
});

export default UserRegisterView;
