import { Route, Redirect } from "react-router-dom";

const PrivateRoutesAdmin = ({ children, ...rest }) => {
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

export default PrivateRoutesAdmin;
