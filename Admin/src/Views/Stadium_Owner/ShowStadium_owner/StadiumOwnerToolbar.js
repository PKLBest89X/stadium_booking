import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { onPopupOpen } from "../../../Slices/Features/Popup/popupSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";

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

const StadiumOwnerToolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <div className={classes.toolLayout}>
          <Box
            className={classes.toolContainer}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
                placeholder="ຄົ້ນຫາເຈົ້າຂອງເດີ່ນ..."
                variant="outlined"
              />
            </div>

            <Button
              className={classes.buttonStyles}
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              onClick={() => dispatch(onPopupOpen("addStadiumOwner"))}
            >
              ເພີ່ມເຈົ້າຂອງເດີ່ນ
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

StadiumOwnerToolbar.propTypes = {
  className: PropTypes.string,
};

export default StadiumOwnerToolbar;
