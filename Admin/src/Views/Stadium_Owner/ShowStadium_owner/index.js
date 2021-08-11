import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import PopupLayout from "../../../Components/PopupLayout";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";

import { fetchGetAllStadiumOwner } from "../../../middlewares/fetchStadiumOwner";
import { fetchAuthSuperAdmin } from "../../../middlewares/fetchAuth";

import { useDispatch } from "react-redux";
import StadiumOwnerTable from "./StadiumOwnerTable";
import StadiumOwnerToolbar from "./StadiumOwnerToolbar";
import AddStadiumOwner from '../AddStadium_owner';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider, Paper, Toolbar } from "@material-ui/core";

import StadiumOwnerCard from "./StadiumOwnerCard";
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

const ShowStadiumOwner = React.memo(({ ...rest }) => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { stadiumOwnerData, stadiumOwnerSuccess } = useShallowEqualSelector(
    (state) => state.stadiumOwner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const superAdminToken = JSON.parse(localStorage.getItem("accessSuperAdminToken"));
    if (superAdminToken && superAdminToken.token) {
      dispatch(fetchAuthSuperAdmin(superAdminToken.token));
    }
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchGetAllStadiumOwner());
  }, [dispatch]);

  const sortStadiumOwner = (array) => {
    const getArray = [...array];
    getArray.sort(
      (a, b) => new Date(b["regis_date"]) - new Date(a["regis_date"])
    );
    return getArray;
  };

  const ShowEmptyStadiumOwner = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3">ບໍ່ມີພະນັກງານຂອງເດີ່ນ</Typography>
    </div>
  );

  let AddStadiumOwnerForm = null;
  if (popupName === "addStadiumOwner" && isOpen === true) {
    AddStadiumOwnerForm = (
      <PopupLayout>
        <AddStadiumOwner />
      </PopupLayout>
    );
  }

  // let EditEmployeeForm = null;
  // if (popupName === "editEmployee" && isOpen === true) {
  //   UpdateStadiumForm = (
  //     <PopupLayout>
  //       <EditEmployee stadiumData={stateRef.current} />
  //     </PopupLayout>
  //   );
  // }

  return (
    <>
      {AddStadiumOwnerForm}
      <PageLayout title="Stadium Employee" {...rest}>
        <div className={classes.pageContainer}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ເຈົ້າຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
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
                {sortStadiumOwner(stadiumOwnerData).map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <StadiumOwnerCard getitems={items} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Paper>
          </Box>
          <Box mt={3}>
            <StadiumOwnerToolbar />
            {stadiumOwnerSuccess === true && <StadiumOwnerTable />}
            {stadiumOwnerSuccess === false && <ShowEmptyStadiumOwner />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
});

export default ShowStadiumOwner;
