import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import BookingHeaderControl from "./BookingHeaderControl";
import BookingTabControl from "./BookingTabControl";
import moment from "moment";

import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import {
  onSelectedBookingDetailsNonAccount,
  onSelectedAllBookingDetailsNonAccount,
  onClearBookingDetailsNonAccount,
} from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
import NumberFormat from "react-number-format";

const descendingComparator = (a, b, orderBy) => {
  let valueA;
  let valueB;
  if (orderBy === "kickoff_date") {
    valueA = new Date(a[orderBy]);
    valueB = new Date(b[orderBy]);
  } else {
    valueA = a[orderBy];
    valueB = b[orderBy];
  }
  if (valueA < valueB) {
    return 1;
  }
  if (valueA > valueB) {
    return -1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const useStyles = makeStyles((theme) => ({
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

const BookingTable = React.memo(({ bookingDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookingDetailsSelectedNonAccount } = useShallowEqualSelector(
    (state) => state.bookingDetailsNonAccount
  );
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("td_start");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      dispatch(onSelectedAllBookingDetailsNonAccount(bookingDetails));
      return;
    }
    dispatch(onClearBookingDetailsNonAccount());
  };

  const handleClick = (event, name) =>
    dispatch(onSelectedBookingDetailsNonAccount(name));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) =>
    bookingDetailsSelectedNonAccount.findIndex(
      (items) => items.td_id === name.td_id && items.std_id === name.std_id
    ) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, bookingDetails.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableContainer className={classes.customScrollbar}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <BookingHeaderControl
            classes={classes}
            numSelected={bookingDetailsSelectedNonAccount.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={bookingDetails.length}
          />
          <TableBody>
            {stableSort(bookingDetails, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={labelId}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.std_name}
                    </TableCell>
                    <TableCell align="right">{`${row.td_start} ໂມງ`}</TableCell>
                    <TableCell align="right">{`${row.td_end} ໂມງ`}</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={row.sp_price}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" ກີບ"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.kickoff_date).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.customScrollbar}
        component="div"
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={bookingDetails.length}
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
    </div>
  );
});

export default BookingTable;
