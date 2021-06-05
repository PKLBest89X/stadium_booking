import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Theme";
import MainLayout from "./Layouts/index";
import GlobalStyles from "./Components/GlobalStyles";
import NotFoundView from "./Views/Errors/NotFoundView";
import DefaultLayout from "./Layouts/DefaultLayout";
import UserLoginView from "./Views/Users/Auth/UserLoginView";
import UserRegisterView from "./Views/Users/Auth/UserRegisterView";
import AdminLoginView from "./Views/StadiumUsers/Auth/AdminLoginView";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/404" exact>
              <NotFoundView />
            </Route>
            <Route path="/login" exact>
              <DefaultLayout />
              <UserLoginView />
            </Route>
            <Route path="/register" exact>
              <DefaultLayout />
              <UserRegisterView />
            </Route>
            <Route path="/admin/login" exact>
              <DefaultLayout />
              <AdminLoginView />
            </Route>
            <Route path="/">
              <MainLayout />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
