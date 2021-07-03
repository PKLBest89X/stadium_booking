import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Edit from "@material-ui/icons/Edit";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import { onUpdateStadiumDetails } from "../../../../Slices/Features/StadiumUsers/crudStadium/stadiumDetailsSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import TabControl from "./TabControl";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Card,
  Box,
  Avatar,
  Typography,
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
    "& > IconButton": {},
  },
});

const StadiumsTable = React.memo(() => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { stadiumsData } = useShallowEqualSelector(
    (state) => state.stadiumDetails
  );
  const dispatch = useDispatch();
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, stadiumsData.length - page * rowsPerPage);

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
              <TableCell align="center">
                <Typography variant="h5">ຊື່ສະໜາມ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ມື້ເພີ່ມສະໜາມ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ສະຖານະ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? stadiumsData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : stadiumsData
            ).map((row) => (
              <TableRow key={row.std_id}>
                {/* <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell> */}
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
                  <Typography variant="h5">
                    {moment(row.regisDate).format("DD/MM/YYYY")}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">{row.std_status}</Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <div className={classes.btnAction}>
                    <IconButton
                      onClick={() => {
                        dispatch(onUpdateStadiumDetails(row));
                        dispatch(onPopupOpen("editStadiums"));
                      }}
                    >
                      <Edit />
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
        count={stadiumsData.length}
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
});

export default StadiumsTable;
