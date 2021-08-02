import React from "react";
import {
  TableHead,
  TableSortLabel,
  TableRow,
  TableCell,
  Checkbox,
} from "@material-ui/core";
import PropTypes from "prop-types";
const WaterHeaderControl = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
    console.log(event)
    console.log(property)
  };

  const headCells = [
    {
      id: "stw_name",
      numeric: false,
      disablePadding: true,
      label: "ຊື່ເຄື່ອງ",
    },
    { id: "qty", numeric: true, disablePadding: false, label: "ຈຳນວນ" },
    { id: "stw_price", numeric: true, disablePadding: false, label: "ລາຄາ" },
    { id: "action", numeric: true, disablePadding: false, label: "ຈັດການ"}
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={(event) => createSortHandler(event, headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

WaterHeaderControl.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default WaterHeaderControl;
