import React, { useCallback, useState } from "react";
import PageLayout from "../../../Components/PageLayout";
import { Link } from "react-router-dom";
import { useShallowEqualSelector } from '../../../Components/useShallowEqualSelector';
import { useDispatch } from 'react-redux';
import { addStadiumOwner } from '../../../middlewares/fetchStadiumOwner';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AddStadiumOwner = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error } = useShallowEqualSelector(state => state.stadiumOwner);
  const [addPeople, setAddPeople] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });
  const onFirstNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  const onLastNameChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  const onAgeChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  const onEmailChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  const onPasswordChange = useCallback((event) => {
    const { name, value } = event.target;
    setAddPeople((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);
  return (
    <PageLayout title="Register user" {...rest}>
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
              dispatch(addStadiumOwner(addPeople))
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
              value={addPeople.firstName}
              onChange={onFirstNameChange}
            />
            <TextField
              fullWidth
              label="Last name"
              margin="normal"
              name="lastName"
              variant="outlined"
              value={addPeople.lastName}
              onChange={onLastNameChange}
            />
            <TextField
              fullWidth
              label="age"
              margin="normal"
              name="age"
              type="number"
              InputLabelProps={{ maxLength: 10 }}
              variant="outlined"
              value={addPeople.age}
              onChange={onAgeChange}
            />
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              value={addPeople.email}
              onChange={onEmailChange}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              value={addPeople.password}
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
                {loading === true ? 'Loading...' : 'ເພີ່ມ'}
              </Button>
            </Box>
            {error && <p>{error}</p>}
          </form>
        </Container>
      </Box>
    </PageLayout>
  );
});

export default AddStadiumOwner;
