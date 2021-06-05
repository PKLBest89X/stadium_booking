import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Theme";
import DashboardLayout from "./Layouts/DashboardLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import NotFoundView from "./Views/Errors/NotFound";
import GlobalStyles from "./Components/GlobalStyles";

import LoginView from "./Views/Auth/LoginView";
import Registerview from "./Views/Auth/RegisterView";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyles />
          <Switch>
            <Route path="/404" exact>
              <NotFoundView />
            </Route>
            <Route path="/login" exact>
              <DefaultLayout />
              <LoginView />
            </Route>
            <Route path="/register" exact>
              <DefaultLayout />
              <Registerview />
            </Route>
            <Route path="/">
              <DashboardLayout />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
