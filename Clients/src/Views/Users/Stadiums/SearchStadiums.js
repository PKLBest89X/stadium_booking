import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { onSearchChange } from "../../../Slices/Features/Users/feedStadium/feedStadiumSlice";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#CDCDCD",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "black",
  },
  iconButton: {
    padding: 1,
  },
}));

const SearchStadium = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchStadiumValue } = useShallowEqualSelector(
    (state) => state.feedStadium
  );

  const onSearch = (event) => {
    event.preventDefault();
  };

  const onSearchStadiumChange = useCallback(
    (event) => {
      const { value } = event.target;
      dispatch(onSearchChange(value));
    },
    [dispatch]
  );

  return (
    <div className="search-container">
      <Paper component="form" onSubmit={onSearch} className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="ຄົ້ນຫາເດີ່ນ..."
          inputProps={{ "aria-label": "search" }}
          value={searchStadiumValue}
          onChange={onSearchStadiumChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
});

export default SearchStadium;
