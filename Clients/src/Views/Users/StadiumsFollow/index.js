import React from "react";
import PageLayout from "../../../Components/PageLayout";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { animated, useSpring } from "@react-spring/web";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";

import FeedPostByFollowed from "./FeedPostByFollowed";
import { Box } from "@material-ui/core";

import './swiper.css'
const StadiumFollow = ({ ...rest }) => {
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const animation = useSpring({
    to: {
      opacity: 1,
    },
    from: { opacity: 0 },
  });

  const { feedPostData } = useShallowEqualSelector((state) => state.feedPost);
  return (
    <PageLayout title="ຕິດຕາມເດີ່ນ" {...rest}>
      <animated.div style={animation}>
        <h1>ເປັນ feed ການຕິດຕາມເດີ່ນທັງໝົດ</h1>
        <Box padding="2rem">
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
            {feedPostData.map((items, index) => {
              return (
                <SwiperSlide key={index}>
                  <FeedPostByFollowed getitems={items} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </animated.div>
    </PageLayout>
  );
};

export default StadiumFollow;
