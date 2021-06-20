import { Route, Redirect, Switch } from "react-router-dom";

const PrivateRouteUsers = ({ children, ...rest }) => {
  const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
  return (
    <Switch>
      {userToken ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to='/login' />
      )}
    </Switch>
  );
};

export default PrivateRouteUsers;
