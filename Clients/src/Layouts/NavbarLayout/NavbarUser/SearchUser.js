import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useShallowEqualSelector } from '../../../Components/useShallowEqualSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
  },
  iconButton: {
    padding: 1,
    color: "white",
  },
}));

const Search = ({ role }) => {
  const classes = useStyles();
  const { user } = useShallowEqualSelector((state) => state.auth);
  return (
    <div className="search-container">
      {role === "user" || user === "quest" ? (
        <>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="ຄົ້ນຫາເດີ່ນ..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </>
      ) : null}
    </div>
  );
};

export default Search;
