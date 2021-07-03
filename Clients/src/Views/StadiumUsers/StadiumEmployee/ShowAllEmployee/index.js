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
import { Typography, Box, Divider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const StadiumEmployee = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { employeeFetchSuccess } = useShallowEqualSelector(
    (state) => state.employees
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
            <EmployeeToolbar />
            {employeeFetchSuccess === true && <EmployeeTable />}
            {employeeFetchSuccess === false && <ShowEmptyEmployee />}
          </Box>
        </div>
      </PageLayout>
    </>
  );
};

export default StadiumEmployee;
