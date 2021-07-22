import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TableHeaderControl from "./TableHeaderControl";
import ToolbarControl from "./ToolbarControl";
import TabControl from "./TabControl";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import {
  onHandleSelect,
  onHandleSelectAll,
  onClearSelect,
} from "../../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";

const descendingComparator = (a, b, orderBy) => {
  if (a[orderBy] < b[orderBy]) {
    return 1;
  }
  if (a[orderBy] > b[orderBy]) {
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
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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
}));

const TimesAndPrice = React.memo(({ times }) => {
  const classes = useStyles();
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { timeAndPriceSelected } = useShallowEqualSelector(
    (state) => state.bookingDetails
  );
  const { filterByDateData } = useShallowEqualSelector(
    (state) => state.getTimes
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
      let requestBookingDetails = times.map((items) => ({
        ...items,
        b_id: bookingId,
        kickoff_date: filterByDateData,
      }));
      dispatch(onHandleSelectAll(requestBookingDetails));
      return;
    }
    dispatch(onClearSelect());
  };

  const handleClick = (event, name) => {
    let selectedData = {
      ...name,
      b_id: bookingId,
      kickoff_date: filterByDateData,
    };
    dispatch(onHandleSelect(selectedData));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) =>
    timeAndPriceSelected.findIndex(
      (items) => items.td_id === name.td_id && items.std_id === name.std_id
    ) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, times.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ToolbarControl numSelected={timeAndPriceSelected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHeaderControl
              classes={classes}
              numSelected={timeAndPriceSelected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={times.length}
            />
            <TableBody>
              {stableSort(times, getComparator(order, orderBy))
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
                      <TableCell align="right">{`${row.sp_price} ກີບ`}</TableCell>
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
          component="div"
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={times.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TabControl}
        />
      </Paper>
    </div>
  );
});

export default TimesAndPrice;
