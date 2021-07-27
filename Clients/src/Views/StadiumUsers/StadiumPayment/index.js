import React, { useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { fetchCheckStadium } from '../../../middlewares/fetchCheckValidData/fetchCheckValidData';
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import moment from "moment";

const StadiumPayment = ({ ...rest }) => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
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
      history.replace('/404')
    }
  }, [history, checkResult]);

  const compareTime = () => {
    let time1 = '15:00:00';
    let timeFixed = parseInt(time1.slice(0, 2)) - 1;
    let realTime = `${timeFixed}:00:00`;
    let time3 = moment(Date.now()).format("YYYY-MM-DD")
    let time4 = new Date(`${time3} ${realTime}`)
    let time5 = new Date()
    let compareGG = (time4 - time5);

    if (compareGG < 0) {
      return console.log("ກາຍໂມງແລ້ວເດີ!!");
    }
    return console.log(time5);
  }
  return (
    <PageLayout title="Stadium Payment" {...rest}>
      <h1>ຈັດການການຊຳລະເງິນໃຫ້ແກ່ລູກຄ້າ</h1>
      <Button color="primary" variant="contained" onClick={compareTime}>
        ທຽບເວລາກັບປັດຈຸບັນ
      </Button>
    </PageLayout>
  );
};

export default StadiumPayment;
