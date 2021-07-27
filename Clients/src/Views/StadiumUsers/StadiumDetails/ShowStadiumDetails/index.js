import React, { useEffect } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadiumDetails } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import PageLayout from "../../../../Components/PageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider, Paper, Toolbar } from "@material-ui/core";
import StadiumsTable from "./StadiumsTable";
import AddStadiumDetails from "../AddStadiumDetails";
import EditStadiumDetails from "../EditStadiumDetails";
import ToolbarControl from "./Toobar";

import StadiumsCard from "./StadiumsCard";
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

const ShowStadiumDetails = React.memo(({ ...rest }) => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { stadiumsSuccess, stadiumsDataSortByDate } = useShallowEqualSelector(
    (state) => state.stadiumDetails
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
    dispatch(fetchGetStadiumDetails(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyStadiumDetails = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3" color="textSecondary">
        ບໍ່ມີເດີ່ນເຕະບານ
      </Typography>
    </div>
  );

  let AddStadiumsForm = null;
  if (popupName === "addStadiums" && isOpen === true) {
    AddStadiumsForm = (
      <PopupLayout>
        <AddStadiumDetails />
      </PopupLayout>
    );
  }

  let EditStadiumsForm = null;
  if (popupName === "editStadiums" && isOpen === true) {
    EditStadiumsForm = (
      <PopupLayout>
        <EditStadiumDetails />
      </PopupLayout>
    );
  }

  return (
    <>
      {AddStadiumsForm}
      {EditStadiumsForm}
      <PageLayout title="Stadium Details" {...rest}>
        <div className={classes.pageContainer}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ສະໜາມຂອງເດີ່ນ
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
                {stadiumsDataSortByDate.map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <StadiumsCard getitems={items} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Paper>
          </Box>
          <Box mt={3}>
            <ToolbarControl />
            {stadiumsSuccess === true && <StadiumsTable />}
            {stadiumsSuccess === false && <ShowEmptyStadiumDetails />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
});

export default ShowStadiumDetails;
