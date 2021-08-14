import React, { useEffect } from "react";
import PageLayout from "../../../../Components/PageLayout";
import PopupLayout from "../../../../Components/PopupLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { fetchGetEmployee } from "../../../../middlewares/stadiumUser/fetchCRUDEmployee/fetchCRUDEmployee";
import { useDispatch } from "react-redux";
import EmployeeTable from "./EmployeeTable";
import EmployeeToolbar from "./EmployeeToolbar";
import AddEmployee from '../AddEmployee';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider, Paper, Toolbar } from "@material-ui/core";

import EmployeeCard from "./EmployeeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.scss";
import "./swiper.css";

import { unwrapResult } from "@reduxjs/toolkit";

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

const StadiumEmployee = React.memo(({ ...rest }) => {
  const classes = useStyles();
  SwiperCore.use([Keyboard, Navigation, Pagination]);
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { employeeFetchSuccess, employeeDataSortByDate } = useShallowEqualSelector(
    (state) => state.employees
  );
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      const authRequest = async () => {
        const getReponse = await dispatch(fetchAuthAdmin(adminToken.token));
        const result = unwrapResult(getReponse);
        if (result.role === "staff") {
          history.replace("/401");
        }
        dispatch(userNow("admin"));
      };
      authRequest();
    }
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetEmployee(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyEmployee = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3">ບໍ່ມີພະນັກງານຂອງເດີ່ນ</Typography>
    </div>
  );

  let AddEmployeeForm = null;
  if (popupName === "addEmployee" && isOpen === true) {
    AddEmployeeForm = (
      <PopupLayout>
        <AddEmployee />
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
      {AddEmployeeForm}
      <PageLayout title="Stadium Employee" {...rest}>
        <div className={classes.pageContainer}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ພະນັກງານຂອງເດີ່ນ
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
                {employeeDataSortByDate.map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <EmployeeCard getitems={items} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Paper>
          </Box>
          <Box mt={3}>
            <EmployeeToolbar />
            {employeeFetchSuccess === true && <EmployeeTable />}
            {employeeFetchSuccess === false && <ShowEmptyEmployee />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
});

export default StadiumEmployee;
