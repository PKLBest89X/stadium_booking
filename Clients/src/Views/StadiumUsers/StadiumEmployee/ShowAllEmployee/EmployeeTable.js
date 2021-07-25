import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

import TabEmployeeControl from "./TabEmployeeControl";
import {
  IconButton,
  Card,
  Table,
  Box,
  Avatar,
  TableHead,
  Typography,
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
});

const EmployeeTable = React.memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { employeesData } = useShallowEqualSelector((state) => state.employees);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, employeesData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card elevation={10}>
      <TableContainer className={classes.customScrollbar}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Typography variant="h5">
                  <Checkbox />
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ຊື່ ແລະ ນາມສະກຸນ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ອາຍຸ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ເພດ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ມື້ລົງທະບຽນ</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Email</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? employeesData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : employeesData
            ).map((row) => (
              <TableRow key={row.su_id}>
                <TableCell padding="checkbox">
                  <Box display="flex" alignItems="center">
                    <Checkbox />
                  </Box>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: 300 }}
                  align="left"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Box marginRight="1em">
                      <Avatar
                        src={`/assets/images/adminPics/adminProfile/${row.picture}`}
                        alt={row.su_name}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h5">{`${row.su_name} ${row.su_surname}`}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 70 }} align="left">
                  <Box>
                    <Typography variant="h5">{`${row.su_age} ປີ`}</Typography>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 70 }} align="left">
                  <Box>
                    <Typography variant="h5">{row.su_gender}</Typography>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  {moment(row.regis_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell style={{ width: 70 }} align="left">
                  <Box>
                    <Typography variant="h5">{row.su_email}</Typography>
                  </Box>
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
        className={classes.customScrollbar}
        component="div"
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={employeesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TabEmployeeControl}
      />
    </Card>
  );
});

export default EmployeeTable;
