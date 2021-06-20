import React, { useEffect } from "react";
import ChildPageLayout from "../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";

const Overall = ({ getTabChange, ...rest }) => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => getTabChange(0), [getTabChange]);

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

  return (
    <ChildPageLayout title="Stadium Overall">
      <h1>ພາບລວມຂອງການຈັດການເດີ່ນ</h1>
    </ChildPageLayout>
  );
};
export default Overall;
