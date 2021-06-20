import React, { useEffect } from "react";
import ChildPageLayout from "../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";

const StadiumFeed = ({ getTabChange, ...rest }) => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => getTabChange(0), [getTabChange]);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem('accessUserToken'))
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token))
      dispatch(userNow('userLoggedIn'))
    } else {
      dispatch(userNow('quest'));
    }
    
  }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchCheckStadium(stadiumId_Admin));
//   }, [dispatch, stadiumId_Admin]);

//   useEffect(() => {
//     if (checkResult === 404) {
//       history.replace("/404");
//     }
//   }, [history, checkResult]);

  return (
    <ChildPageLayout title="Stadium Feed">
      <h1>ໜ້າ feed ສຳລັບ user ເຂົ້າເບິ່ງ</h1>
    </ChildPageLayout>
  );
};
export default StadiumFeed;
