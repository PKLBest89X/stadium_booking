import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Avatar, Box, Typography } from "@material-ui/core";
import { fetchDeletePost } from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";
import { onDeletePost } from "../../../../Slices/Features/StadiumUsers/post/postSlice";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

import TabPostControl from "./TabPostControl";
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
    "& > IconButton": {},
  },
});

const PostTable = React.memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const { postsData } = useShallowEqualSelector((state) => state.posts);
  const { url } = useRouteMatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, postsData.length - page * rowsPerPage);

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
                <Box display="flex" alignItems="center">
                  <Checkbox />
                  <Typography variant="h5">ລະຫັດ Post</Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">ຫົວຂໍ້ Post</Typography>
              </TableCell>
              {/* <TableCell>ຮູບ Post</TableCell> */}
              <TableCell align="center">
                <Typography variant="h5">ມື້ Post</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? postsData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : postsData
            ).map((row) => (
              <TableRow key={row.pt_id}>
                <TableCell padding="checkbox" component="th">
                  <Box display="flex" alignItems="center">
                    <Checkbox />
                    <Typography variant="h5">{row.pt_id}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: 160 }}
                  align="left"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Box marginRight="1em">
                      <Avatar
                        src={`/assets/images/adminPics/postPics/${row.post_img}`}
                        alt={row.post_title}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h5">{row.post_title} </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <Typography variant="h5">
                    {moment(row.post_date).format("DD/MM/YYYY")}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="center">
                  <div className={classes.btnAction}>
                    <IconButton
                      onClick={() =>
                        history.push(`${url}/edit-post/${row.pt_id}`)
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        const getIds = {
                          postId: row.pt_id,
                          stadiumId: row.st_id,
                          postImage: row.post_img
                        };
                        dispatch(fetchDeletePost(getIds)).then(() =>
                          dispatch(onDeletePost(getIds))
                        );
                      }}
                    >
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
        count={postsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TabPostControl}
      />
    </Card>
  );
});

export default PostTable;
