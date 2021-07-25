import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { makeStyles } from "@material-ui/core/styles";
import HomeContents from "./HomeContents";
import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { userNow } from '../../../Slices/Authentication/authSlice';
import { useShallowEqualSelector } from '../../../Components/useShallowEqualSelector';
import { fetchFeedPost } from "../../../middlewares/user/fetchFeedPost/fetchFeedPost";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    top: 0,
    left: 0,
  },
  layoutContainer: {
    padding: "2em",
  },
  contentContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gridGap: "1em",
    
  },
}));

const Home = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { feedPostData } = useShallowEqualSelector((state) => state.feedPost);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchFeedPost());
  }, [dispatch])

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem('accessUserToken'))
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token))
      dispatch(userNow('userLoggedIn'))
    } else {
      dispatch(userNow('quest'));
    }
    
  }, [dispatch]);
  return (
    <PageLayout title="ໜ້າຫຼັກ" {...rest}>
      <div className={classes.root}>
        <div className={classes.layoutContainer}>
          <div className={classes.contentContainer}>
            {feedPostData.map((items) => {
              return <HomeContents key={items.pt_id} getitems={items} />;
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
});

export default Home;
