import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Box,
  Typography,
  Divider,
  Paper,
  Toolbar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DatePickerBooking from "./DatePickerBooking";
import EventIcon from "@material-ui/icons/Event";
import NonBooking from "./NonBooking";

import {
  fetchBookingList,
  fetchBookingListDetails,
  fetchGetStadiumDetailsBeforeBooking,
} from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import BookingListUnCheckout from "./BookingListUnCheckout";
import StadiumsCard from "./StadiumsCard";
import {
  onPopupOpen,
  onTabOpen,
} from "../../../../../Slices/Features/Popup/popupSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper.css";

const useStyles = makeStyles(() => ({}));

const StadiumBooking = React.memo(({ getTabChange, ...rest }) => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { preBookingDetailsData, preStadiumsData, preBookingDetailsSuccess } =
    useShallowEqualSelector((state) => state.preBooking);
  const { stadiumId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const dateRef = useRef();
  const [openDate, setOpenDate] = useState(false);

  const onOpenDate = (payload) => setOpenDate(payload);

  useEffect(() => getTabChange(2), [getTabChange]);

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
    dispatch(fetchCheckStadium(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetStadiumDetailsBeforeBooking(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    dispatch(fetchBookingListDetails(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    dispatch(fetchBookingList(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => dispatch(onTabOpen("tabForBooking")), [dispatch]);

  return (
    <ChildPageLayout title="Stadium Booking">
      <Box>
        <Paper>
          <Toolbar className={classes.root}>
            <Typography
              className={classes.title}
              variant="h5"
              id="tableTitle"
              component="div"
              color="textSecondary"
            >
              ສະໜາມຂອງເດີ່ນ
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
            {preStadiumsData.map((items, index) => {
              return (
                <SwiperSlide key={index}>
                  <StadiumsCard getitems={items} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Paper>
      </Box>
      <Box
        padding="1rem"
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h3" color="textSecondary">
          ການຈອງຂອງລູກຄ້າ
        </Typography>
        <Box>
          <Tooltip title="ຄົ້ນຫາຕາມມື້">
            <IconButton onClick={() => onOpenDate(true)}>
              <EventIcon />
            </IconButton>
          </Tooltip>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerBooking
              open={openDate}
              selectedDate={onOpenDate}
              ref={dateRef}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Box>
      <Divider />
      {preBookingDetailsSuccess === true && (
        <Box display="flex" justifyItems="center" mt={2}>
          <BookingListUnCheckout bookingBillData={preBookingDetailsData} />
        </Box>
      )}
      {preBookingDetailsSuccess === false && <NonBooking />}
    </ChildPageLayout>
  );
});
export default StadiumBooking;
