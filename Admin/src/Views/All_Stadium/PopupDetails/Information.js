import React from "react";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import {
  Box,
  CardHeader,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@material-ui/core";
import moment from "moment";

const Information = React.memo(() => {
  const { stadiumInfo } = useShallowEqualSelector((state) => state.allStadiums);
  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h4" color="textSecondary">
                ລາຍລະອຽດ
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Box
              display="block"
              justifyContent="center"
              alignItems="center"
              padding="1rem"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ເດີ່ນ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${stadiumInfo.stadiumName}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ເຈົ້າຂອງເດີ່ນ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${stadiumInfo.managerName} ${stadiumInfo.managerSurname}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ບ້ານ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${stadiumInfo.village}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ເມືອງ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${stadiumInfo.district}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ແຂວງ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${stadiumInfo.province}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ມື້ລົງທະບຽນ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${moment(stadiumInfo.regisDate).format(
                    "DD-MM-YYYY"
                  )}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
              >
                <Typography variant="h4" color="textSecondary">
                  ເບີໂທເດີ່ນ:{" "}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  {`${stadiumInfo.phone}`}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
});

export default Information;
