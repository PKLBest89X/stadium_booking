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
  colors,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";

import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

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
  paid: {
    color: colors.green[900],
  },
  notYet: {
    color: colors.red[600],
  },
}));

const OtherDetails = React.memo(({ data }) => {
  const classes = useStyles();
  // const { paymentDetailsData } = useShallowEqualSelector(
  //   (state) => state.paymentDetails
  // );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
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
                <Typography variant="h5">ຊື່ສະໜາມ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ເວລາ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ມື້ເຕະ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ສະຖານະ</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TableRow key={index}>
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
                      <Typography variant="h5">{row.std_name} </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">
                    {`${row.td_start.slice(0, 2)} ໂມງ - ${row.td_end.slice(
                      0,
                      2
                    )} ໂມງ`}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">
                    {moment(row.kickoff_date).format("DD/MM/YYYY")}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  {row.sub_status === "ເຕະແລ້ວ" && (
                    <Typography className={classes.paid} variant="h5">
                      ຈ່າຍແລ້ວ
                    </Typography>
                  )}
                  {row.sub_status === "ຍັງບໍ່ເຕະ" && (
                    <Typography className={classes.notYet} variant="h5">
                      ຍັງບໍ່ຈ່າຍ
                    </Typography>
                  )}
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

export default OtherDetails;
