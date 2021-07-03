import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  toolLayout: {
    marginBottom: "2em",
  },
  toolContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down(700)]: {
      flexDirection: "column-reverse",

      "& > div": {
        width: "100%",
        display: "block",
        alignItems: "flex-start",
      },
      "& > Button": {
        marginBottom: "1em",
      },
    },
  },
  searchContainer: {
    flex: 1,
    maxWidth: 700,
  },
  buttonStyles: {
    padding: "1em 2em",
    marginLeft: "1em",
  },
}));

const PostToolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <div className={classes.toolLayout}>
          <div className={classes.toolContainer}>
            <div className={classes.searchContainer}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="ຄົ້ນຫາ Post..."
                variant="outlined"
              />
            </div>

            <Button
              className={classes.buttonStyles}
              color="primary"
              variant="contained"
              onClick={() => dispatch(onPopupOpen('addPost'))}
            >
              ສ້າງ Post ຂອງເດີ່ນ
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

PostToolbar.propTypes = {
  className: PropTypes.string,
};

export default PostToolbar;
