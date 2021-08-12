import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { Box, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { fetchGetAllStadiumForUser } from "../../../middlewares/user/fetchStadium/fetchStadium";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";

import NonStadiums from "./NonStadiums";
import StadiumList from "./StadiumList";
import SearchStadiums from "./SearchStadiums";

const useStyles = makeStyles((theme) => ({
  containerLayout: {
    flex: 1,
    width: "100%",
    padding: "2rem",
    [theme.breakpoints.between("sm", "sm")]: {
      padding: "1rem 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1rem .5rem",
    },
  },
}));

const Stadiums = React.memo(({ ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { feedAllStadiumData, feedAllStadiumSuccess, searchResultData } =
    useShallowEqualSelector((state) => state.feedStadium);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  useEffect(() => dispatch(fetchGetAllStadiumForUser()), [dispatch]);

  return (
    <PageLayout title="ເດີ່ນ" {...rest}>
      <div className={classes.containerLayout}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" color="textSecondary">
            ເດີ່ນທັງໝົດ
          </Typography>
          <SearchStadiums />
        </Box>
        <Divider />
        {feedAllStadiumSuccess === true && (
          <Box display="flex" justifyItems="center" mt={2}>
            <StadiumList
              stadiumData={
                searchResultData.length > 0
                  ? searchResultData
                  : feedAllStadiumData
              }
            />
          </Box>
        )}
        {feedAllStadiumSuccess === false && <NonStadiums />}
      </div>
    </PageLayout>
  );
});

export default Stadiums;
