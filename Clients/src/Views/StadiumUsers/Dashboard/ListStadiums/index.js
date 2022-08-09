import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListStadiumItems from "./ListStadiumItems";
import { Box, Paper, Typography, Divider } from "@material-ui/core";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination, Autoplay } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper1.css";

import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchGetStadiumDetails } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";
import NonStadiums from "./NonStadiums";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "100%",
    display: "block",
    overflow: "hidden",
    width: "100%",
  },
}));

const ListStadiums = React.memo(() => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const { stadiumId_Admin } = useParams();
  const { stadiumsData, stadiumsSuccess } = useShallowEqualSelector(
    (state) => state.stadiumDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStadiumDetails(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  return (
    <div className={classes.root}>
      <Box>
        <Paper>
          <Box padding="1rem">
            <Typography color="textPrimary" variant="h5">
              ສະໜາມທັງໝົດ
            </Typography>
          </Box>
          <Divider />
          {stadiumsSuccess === true && (
            <Swiper
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
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
                    <ListStadiumItems key={index} getitems={items} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {stadiumsSuccess === false && <NonStadiums />}
        </Paper>
      </Box>
    </div>
  );
});

export default ListStadiums;
