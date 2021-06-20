import { Switch, Redirect, Route } from "react-router-dom";
import Overall from "../Views/StadiumUsers/Stadiums/Overall";
import ShowStadiumDetails from "../Views/StadiumUsers/Stadiums/StadiumDetails/ShowStadiumDetails";
import AddStadiumDetails from "../Views/StadiumUsers/Stadiums/StadiumDetails/AddStadiumDetails";
import EditStadiumDetails from "../Views/StadiumUsers/Stadiums/StadiumDetails/EditStadiumDetails";
import StadiumDrink from "../Views/StadiumUsers/Stadiums/StadiumDrink/ShowStadiumDrink";
import AddStadiumDrink from '../Views/StadiumUsers/Stadiums/StadiumDrink/AddStadiumDrink';
import EditStadiumDrink from '../Views/StadiumUsers/Stadiums/StadiumDrink/EditStadiumDrink';
import StadiumPrice from "../Views/StadiumUsers/Stadiums/StadiumPrice/ShowStadiumPrice";
import AddStadiumPrice from "../Views/StadiumUsers/Stadiums/StadiumPrice/AddStadiumPrice";
import PrivateRoutesAdmin from "./PrivateRoutesAdmin";

const RoutesChildComponentsAdmin = ({ tabChange, ...rest }) => {
  return (
    <>
      <Switch>
        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage" exact>
          <Overall getTabChange={tabChange} {...rest}/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-details" exact>
          <ShowStadiumDetails getTabChange={tabChange} {...rest}/>
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-details/add-stadiums">
          <AddStadiumDetails getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-details/edit-stadiums/:stadiumDetailsId">
          <EditStadiumDetails getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-price" exact>
          <StadiumPrice getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-price/add-price">
          <AddStadiumPrice getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-drink" exact>
          <StadiumDrink getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-drink/add-drink">
          <AddStadiumDrink getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <PrivateRoutesAdmin path="/admin/stadium/:stadiumId_Admin/manage/stadium-drink/edit-drink/:drinkId">
          <EditStadiumDrink getTabChange={tabChange} {...rest} />
        </PrivateRoutesAdmin>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>

  );
};

export default RoutesChildComponentsAdmin;
