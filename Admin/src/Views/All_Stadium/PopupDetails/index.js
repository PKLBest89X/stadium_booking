import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";

import { useDispatch } from "react-redux";

import Header from "./Header";
import Information from "./Information";


const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  text: {
    color: "red",
  },
}));

const PopupDetails = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();


  return (
    <>
      <div>
        <Box padding="1rem"> 
          <Box display="block" justifyContent="center" alignItems="center">
            <Box>
              <Header/>
            </Box>
            <Box mt={3} mb={3}>
              <Information />
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
});

export default PopupDetails;
