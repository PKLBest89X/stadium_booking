import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { useRouteMatch, useHistory } from "react-router-dom";

import TabControl from "./TabControl";
import { priceData } from "./data";
import {
  IconButton,
  Card,
  Table,
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
    "& > IconButton": {

    },
  },
});

const StadiumPriceTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();
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
              <TableCell align="center">ຫົວຂໍ້ Post</TableCell>
              {/* <TableCell>ຮູບ Post</TableCell> */}
              <TableCell align="center">ມື້ Post</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? priceData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : priceData
            ).map((row) => (
              <TableRow key={row.post_id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: 160 }}
                  align="left"
                >
                  {row.post_title}
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  {moment(row.post_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <div className={classes.btnAction}>
                    <IconButton onClick={() => history.push(`${url}/edit-employee/${row.post_id}`)}>
                      <Edit />
                    </IconButton>
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
        ActionsComponent={TabControl}
      />
    </Card>
  );
};

export default StadiumPriceTable;
