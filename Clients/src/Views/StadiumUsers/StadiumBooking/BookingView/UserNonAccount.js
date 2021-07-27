import React, { forwardRef, useCallback } from "react";
import {
  Box,
  CardHeader,
  TextField,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { onUserNonAccountInputing } from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
import { useDispatch } from "react-redux";

const UserNonAccount = forwardRef(({ bookingId }, ref) => {
  const { userNonAccount } = useShallowEqualSelector(
    (state) => state.bookingDetailsNonAccount
  );
  const dispatch = useDispatch();

  const onFirstNameChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const setRequestData = {
        bookingId,
        name,
        value,
      };
      dispatch(onUserNonAccountInputing(setRequestData));
    },
    [dispatch, bookingId]
  );
  const onLastNameChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const setRequestData = {
        bookingId,
        name,
        value,
      };
      dispatch(onUserNonAccountInputing(setRequestData));
    },
    [dispatch, bookingId]
  );

  const onTeamChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const setRequestData = {
        bookingId,
        name,
        value,
      };
      dispatch(onUserNonAccountInputing(setRequestData));
    },
    [dispatch, bookingId]
  );
  const onTelChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const setRequestData = {
        bookingId,
        name,
        value,
      };
      dispatch(onUserNonAccountInputing(setRequestData));
    },
    [dispatch, bookingId]
  );

  return (
    <div ref={ref}>
      <Box mb={3}>
        <Card>
          <CardHeader
            subheader="ສຳລັບລູກຄ້າທີ່ໂທເຂົ້າມາຈອງເດີ່ນ"
            title="ຂໍ້ມູນລູກຄ້າ"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ຊື່ລູກຄ້າ"
                  margin="normal"
                  name="firstName"
                  type="text"
                  variant="outlined"
                  value={userNonAccount.firstName}
                  onChange={onFirstNameChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ນາມສະກຸນ"
                  margin="normal"
                  name="lastName"
                  type="text"
                  variant="outlined"
                  value={userNonAccount.lastName}
                  onChange={onLastNameChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ຊື່ທີມ"
                  margin="normal"
                  name="team"
                  type="text"
                  variant="outlined"
                  value={userNonAccount.team}
                  onChange={onTeamChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ເບີໂທ"
                  margin="normal"
                  name="tel"
                  type="number"
                  variant="outlined"
                  value={userNonAccount.tel}
                  onChange={onTelChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
});

export default UserNonAccount;
