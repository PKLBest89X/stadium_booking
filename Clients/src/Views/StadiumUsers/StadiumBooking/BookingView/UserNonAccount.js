import React, { forwardRef } from "react";
import {
  Box,
  CardHeader,
  TextField,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@material-ui/core";

const UserNonAccount = forwardRef((props, ref) => {
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
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ຊື່ທີມ"
                  margin="normal"
                  name="teamName"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="ເບີໂທ"
                  margin="normal"
                  name="tell"
                  type="number"
                  variant="outlined"
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
