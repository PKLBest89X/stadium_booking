import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
  return (
    <>
      {adminToken ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to="/admin/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
