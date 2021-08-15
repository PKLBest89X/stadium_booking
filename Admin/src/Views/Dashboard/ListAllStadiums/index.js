import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Typography, Divider } from "@material-ui/core";

import StadiumsItems from "./StadiumsItems";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper1.css";

import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";

import { fetchGetAllStadiums } from "../../../middlewares/fetchAllStadiums";
import NonStadium from "./NonStadium";

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

const ListAllStadiums = React.memo(() => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const dispatch = useDispatch();
  const { allStadiumsData, allStadiumsSuccess } = useShallowEqualSelector(
    (state) => state.allStadiums
  );

  useEffect(() => {
    dispatch(fetchGetAllStadiums());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Box>
        <Paper>
          <Box padding="1rem">
            <Typography color="textPrimary" variant="h5">
              ເດີ່ນທັງໝົດ
            </Typography>
          </Box>
          <Divider />
          {allStadiumsSuccess === true && (
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
              {allStadiumsData.map((items, index) => {
                return (
                  <SwiperSlide key={index}>
                    <StadiumsItems getitems={items} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {allStadiumsSuccess === false && <NonStadium />}
        </Paper>
      </Box>
    </div>
  );
});

export default ListAllStadiums;
