import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ ...rest }) => {
  const token = JSON.parse(localStorage.getItem("superAdminToken"));
  return <>{token ? <Route {...rest}></Route> : <Redirect to="/login" />}</>;
};

export default PrivateRoutes;
