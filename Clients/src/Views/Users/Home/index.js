import React, { useState, useEffect } from "react";
import PageLayout from "../../../Components/PageLayout";
import { makeStyles } from "@material-ui/core/styles";
import HomeContents from "./HomeContents";
import ImageData from "./ImageData";
import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    top: 0,
    left: 0,
  },
  layoutContainer: {
    padding: "2em",
  },
  contentContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gridGap: "1em",
  },
}));

const Home = ({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [pic] = useState(ImageData);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=2`)
      .then(async (res) => {
        return await res.json();
      })
      .then((getdata) => {
        const newData = [...getdata.data];
        setUser(
          newData.map((items, index) => {
            const allData = { ...pic[index] };
            return { ...items, ...allData };
          })
        );
      });
  }, [pic]);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem('accessUserToken'))
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token))
    }
    
  }, [dispatch]);
  return (
    <PageLayout title="ໜ້າຫຼັກ" {...rest}>
      <div className={classes.root}>
        <div className={classes.layoutContainer}>
          <div className={classes.contentContainer}>
            {user.map((items) => {
              return <HomeContents key={items.id} getitems={items} />;
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
