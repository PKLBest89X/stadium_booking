import React from "react";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSubscribeStadium } from "../../../middlewares/user/fetchSubscribe/fetchSubscribe";
import { onSubscribeStadium } from "../../../Slices/Features/Users/Subscribe/subscribeSlice";
import { fetchUnSubscribeStadium } from "../../../middlewares/user/fetchSubscribe/fetchSubscribe";
import { onUnSubscribeStadium } from "../../../Slices/Features/Users/Subscribe/subscribeSlice";
const SubscribeTool = React.memo(({ feedStadium }) => {
  const { subscribeSuccessById } = useShallowEqualSelector(
    (state) => state.subscribe
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const Subscribe = () => {
    const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      const subRequestData = {
        stadiumId: feedStadium.st_id,
        token: userToken.token,
      };
      const subDataAfterSubscribe = {
        st_id: feedStadium.st_id,
        st_name: feedStadium.st_name,
        logo: feedStadium.logo
      }
      dispatch(fetchSubscribeStadium(subRequestData)).then(() => dispatch(onSubscribeStadium(subDataAfterSubscribe)));
    } else {
      history.push('/login')
    }
  };

  const UnSubscribe = () => {
    const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      const unSubRequestData = {
        stadiumId: feedStadium.st_id,
        token: userToken.token,
      };
      dispatch(fetchUnSubscribeStadium(unSubRequestData)).then(() => dispatch(onUnSubscribeStadium(unSubRequestData)));
    }
  };
  return (
    <>
      {subscribeSuccessById === false && (
        <Button
          color="primary"
          variant="contained"
          size="medium"
          onClick={Subscribe}
        >
          ຕິດຕາມເດີ່ນ
        </Button>
      )}
      {subscribeSuccessById === true && (
        <Button color="primary" variant="outlined" size="medium" onClick={UnSubscribe}>
          ຕິດຕາມແລ້ວ
        </Button>
      )}
    </>
  );
});

export default SubscribeTool;
