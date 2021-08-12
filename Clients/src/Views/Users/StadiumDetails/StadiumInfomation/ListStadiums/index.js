import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper.css";

import ListStadiumsItems from "./ListStadiumsItems";

const ListStadiums = React.memo(({ stadiumsData }) => {
  SwiperCore.use([Keyboard, Navigation, Pagination]);

  return (
    <>
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
        {stadiumsData.map((items, index) => {
          return (
            <SwiperSlide key={index}>
              <ListStadiumsItems getitems={items} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
});

export default ListStadiums;
