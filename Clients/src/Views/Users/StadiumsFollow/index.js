import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../Slices/Authentication/authSlice";
import {
    fetchGetFeedPostBySubscribed,
    fetchGetSubscribe,
} from "../../../middlewares/user/fetchSubscribe/fetchSubscribe";
import { useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper.css";

import FeedPostByFollowed from "./FeedPostByFollowed";
import FeedStadiumByFollowed from "./FeedStadiumByFollowed";
import { Box, Typography, Divider } from "@material-ui/core";
import NonFollowStadium from "./NonFollowStadium";

const useStyles = makeStyles(() => ({
    contentContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gridGap: "1em",
    },
}));

const StadiumFollow = React.memo(({ ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    SwiperCore.use([Keyboard, Navigation, Pagination]);
    const {
        subscribeData,
        subscribeSuccess,
        getFeedPostData,
        getFeedPostSuccess,
    } = useShallowEqualSelector((state) => state.subscribe);

    useEffect(() => {
        let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
        if (userToken && userToken.token) {
            dispatch(fetchAuthUser(userToken.token));
            dispatch(userNow("userLoggedIn"));
        } else {
            dispatch(userNow("quest"));
        }
    }, [dispatch]);

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
        if (userToken && userToken.token) {
            dispatch(fetchGetSubscribe(userToken.token));
            dispatch(fetchGetFeedPostBySubscribed(userToken.token));
        }
    }, [dispatch]);

    return (
        <PageLayout title="ຕິດຕາມເດີ່ນ" {...rest}>
            {subscribeSuccess === true && (
                <Box padding="2rem">
                    <Box mb={2}>
                        <Typography variant="h4" color="textSecondary">
                            ເດີ່ນທັງໝົດທີ່ໄດ້ຕິດຕາມ
                        </Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Swiper
                            autoplay={true}
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
                            {subscribeData.map((items, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <FeedStadiumByFollowed
                                            getitems={items}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Box>
                    <Box mt={3}>
                        <Box mb={2}>
                            <Typography variant="h4" color="textSecondary">
                                Post ທັງໝົດຂອງເດີ່ນທີ່ຕິດຕາມ
                            </Typography>
                        </Box>
                        <Divider />
                        <Box mt={3}>
                            <div className={classes.contentContainer}>
                                {getFeedPostData.map((items) => {
                                    return (
                                        <FeedPostByFollowed
                                            key={items.pt_id}
                                            getitems={items}
                                        />
                                    );
                                })}
                            </div>
                        </Box>
                    </Box>
                </Box>
            )}
            {subscribeSuccess === false && <NonFollowStadium />}
        </PageLayout>
    );
});

export default StadiumFollow;
