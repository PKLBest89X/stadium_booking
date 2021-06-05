import { Route, Redirect } from "react-router-dom";

const PrivateRouteUsers = ({ children, ...rest }) => {
  const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
  return (
    <>
      {userToken ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PrivateRouteUsers;
