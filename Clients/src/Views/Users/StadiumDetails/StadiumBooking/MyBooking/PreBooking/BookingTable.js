import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Delete from "@material-ui/icons/Delete";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";

import BookingTabControl from "./BookingTabControl";
import {
  IconButton,
  Card,
  Table,
  Box,
  Avatar,
  Typography,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  TableBody,
  TableCell,
  Checkbox,
} from "@material-ui/core";
const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  btnAction: {
    minWidth: 90,
    "& > IconButton": {},
  },
});

const BookingTable = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { priceData } = useShallowEqualSelector((state) => state.stadiumPrice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, priceData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card elevation={10}>
      <TableContainer>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ຊື່ສະໜາມ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ຊ່ວງເວລາ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ລາຄາ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? priceData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : priceData
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: 160 }}
                  align="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box marginRight="1em">
                      <Avatar
                        src={`/assets/images/adminPics/stadiumDetailsPics/${row.picture}`}
                        alt={row.std_name}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h5">{row.std_name} </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">{`${row.td_start} ໂມງ - ${row.td_end} ໂມງ`}</Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">{`${row.sp_price} ກີບ`}</Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <div className={classes.btnAction}>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </div>
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
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={priceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={BookingTabControl}
      />
    </Card>
  );
});

export default BookingTable;
