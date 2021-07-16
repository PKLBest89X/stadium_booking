import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, IconButton } from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";

import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    padding: ".3rem",
    transition: "200ms ease-in-out",
    cursor: "pointer",
  },
  activeToDo: {
    transform: "scale(1.02)",
    backgroundColor: "#3f51b5",
  },
  unActiveToDo: {
    transform: "scale(.98)",
    backgroundColor: "white",
  },
  showCancelButton: {
    display: "block",
  },
  hideCancelButton: {
    display: "none",
  },
  image: {
    display: "block",
    width: "100%",
    position: "relative",
    objectFit: "cover",
    objectPosition: "center center",
    aspectRatio: "16/9",
    height: "calc(100vw / 10 - 1px)",
    [theme.breakpoints.down('xs')]: {
        height: "calc(100vw / 6 - 1px)",
    }
  },
}));

const StadiumsToPick = React.memo(({ stadiums, selectedStadiums }) => {
  const classes = useStyles();
  const [activeToDo, setActiveToDo] = useState({
    isActive: false,
    activeIndex: -1,
  });

  const onActiveToDo = (payload, index) => {
    const { isActive, activeIndex } = activeToDo;
    if (activeIndex === index && isActive === true) {
      setActiveToDo((prev) => ({ ...prev, isActive: false, activeIndex: -1 }));
      selectedStadiums("");
      return;
    }
    setActiveToDo((prev) => ({ ...prev, isActive: true, activeIndex: index }));
    selectedStadiums(payload);
  };

  return (
    <>
      {stadiums.map((items, index) => {
        return (
          <div
            className={clsx(classes.cardContainer, {
              [classes.activeToDo]:
                activeToDo.isActive === true &&
                activeToDo.activeIndex === index,
              [classes.unActiveToDo]:
                activeToDo.isActive === false &&
                activeToDo.activeIndex === index,
            })}
            key={items.std_id}
            onClick={() => onActiveToDo(items.std_id, index)}
          >
            <Card>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                  <Box padding={1}>
                    <Box>
                      <img
                        className={classes.image}
                        src={`/assets/images/adminPics/stadiumDetailsPics/${items.picture}`}
                        alt={items.std_name}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={8} md={8} lg={8} xl={8}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    height="100%"
                  >
                    <Typography variant="h4">{items.std_name}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </>
  );
});

export default StadiumsToPick;
