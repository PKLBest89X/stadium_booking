import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Typography,
  Box,
  Avatar,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";

import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  customScrollbar: {
    "&::-webkit-scrollbar": {
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "0px solid slategrey",
    },
  },
}));

const WaterPaymentDetails = React.memo(() => {
  const classes = useStyles();
  const { waterDetailsData } = useShallowEqualSelector(
    (state) => state.paymentDetails
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, waterDetailsData.length - page * rowsPerPage);
  return (
    <>
      <TableContainer className={classes.customScrollbar}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">ເຄື່ອງດື່ມ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ຈຳນວນ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ລາຄາ</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? waterDetailsData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : waterDetailsData
            ).map((row) => (
              <TableRow key={row.stw_id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: 100 }}
                  align="left"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box>
                      <Typography variant="h5">{row.stw_name} </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">
                    {`${row.qty}`}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <NumberFormat
                    value={row.stw_price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" ກີບ"}
                    renderText={(value) => (
                      <Typography variant="h5" color="textSecondary">
                        {value}
                      </Typography>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default WaterPaymentDetails;
