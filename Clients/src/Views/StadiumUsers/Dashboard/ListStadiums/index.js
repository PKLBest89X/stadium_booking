import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListStadiumItems from "./ListStadiumItems";
import Carousel from "react-material-ui-carousel";
import {
  handleNext,
  handleBack,
  handleStepChange,
} from "../../../../Slices/Features/StadiumUsers/Reports/reportReserveSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchGetStadiumDetails } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "100%",
    display: "block",
    overflow: "hidden",
    width: "100%",
  },
}));

const ListStadiums = React.memo(() => {
  const classes = useStyles();
  const { stadiumId_Admin } = useParams();
  const theme = useTheme();
  const { activeStep } = useShallowEqualSelector(
    (state) => state.reportReserve
  );
  const { stadiumsData } = useShallowEqualSelector(
    (state) => state.stadiumDetails
  );
  const tutorialSteps = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath: "/assets/images/Test/test1.jpg",
    },
    {
      label: "Bird",
      imgPath: "/assets/images/Test/test2.jpg",
    },
    {
      label: "Bali, Indonesia",
      imgPath: "/assets/images/Test/test3.jpg",
    },
    {
      label: "NeONBRAND Digital Marketing, Las Vegas, United States",
      imgPath: "/assets/images/Test/test4.jpg",
    },
    {
      label: "Goč, Serbia",
      imgPath: "/assets/images/Test/test5.jpg",
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStadiumDetails(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const onSlide = (step) => {
    dispatch(handleStepChange(step));
  };

  return (
    <div className={classes.root}>
      <Carousel animation="slide" autoPlay={false} timeout={500}>
        {stadiumsData.map((item, index) => (
          <ListStadiumItems key={index} items={item} />
        ))}
      </Carousel>
    </div>
  );
});

export default ListStadiums;
