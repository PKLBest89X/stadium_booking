import React, { useEffect } from "react";
import PageLayout from "../../../../Components/PageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import AddPost from "../AddPost";
import EditPost from "../EditPost";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { fetchGetPost } from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";
import { useDispatch } from "react-redux";
import PostTable from "./PostTable";
import PostToolbar from "./PostToolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider, Toolbar, Paper } from "@material-ui/core";
import NotificationAlert from "../../../../Components/NotificationAlert";

import PostCard from "./PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper.css";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: "2rem",
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10rem",
    paddingBottom: '10rem',
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const StadiumPosts = React.memo(({ ...rest }) => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );
  const { postSuccess, postsDataSortByDate } = useShallowEqualSelector(
    (state) => state.posts
  );
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetPost(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyPost = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">ບໍ່ມີ Post ຂອງເດີ່ນ</Typography>
    </div>
  );

  let AddPostForm = null;
  if (popupName === "addPost" && isOpen === true) {
    AddPostForm = (
      <PopupLayout>
        <AddPost />
      </PopupLayout>
    );
  }

  let EditPostForm = null;
  if (popupName === "editPost" && isOpen === true) {
    EditPostForm = (
      <PopupLayout>
        <EditPost />
      </PopupLayout>
    );
  }

  let sucessDated = null;
  if (notiName === "successUpdated" && notiState === true) {
    sucessDated = (
      <NotificationAlert notiTitle="ສຳເລັດ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ແກ້ໄຂຂໍ້ມູນສຳເລັດ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {sucessDated}
      {AddPostForm}
      {EditPostForm}

      <PageLayout title="Stadium Post" {...rest}>
        <div className={classes.pageContainer}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              Post ຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <Box mt={3}>
            <Paper>
              <Toolbar className={classes.root}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  id="tableTitle"
                  component="div"
                  color="textSecondary"
                >
                  ລາຍການທີ່ເພີ່ມລ້າສຸດ
                </Typography>
              </Toolbar>
              <Divider />
              <Swiper
                spaceBetween={20}
                observeParents={true}
                simulateTouch={false}
                observer={true}
                slidesPerView={1}
                navigation={true}
                keyboard={{ enabled: true }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                  },
                  960: {
                    slidesPerView: 3,
                  },
                }}
              >
                {postsDataSortByDate.map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <PostCard getitems={items} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Paper>
          </Box>
          <Box mt={3}>
            <PostToolbar />
            {postSuccess === true && <PostTable />}
            {postSuccess === false && <ShowEmptyPost />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
});

export default StadiumPosts;
