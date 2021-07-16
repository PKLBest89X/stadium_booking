import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import { fetchGetTimesToAddPrice } from "../../../../middlewares/stadiumUser/fetchCRUDStadiumPrice/fetchCRUDStadiumPrice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "280px",
    backgroundColor: theme.palette.background.paper,
  },
  formWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 auto",
    overflow: "hidden",
  },

  content: {
    flex: "1 1 auto",
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    overflowY: "hidden",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "0px solid slategrey",
    },
    padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      padding: ".5rem",
    },
  },
}));

const SelectTimes = React.memo(({ priceState, selectedPrice }) => {
  const classes = useStyles();
  const { priceData, getTimesData } = useShallowEqualSelector(
    (state) => state.stadiumPrice
  );
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([-1]);

  useEffect(() => {
    dispatch(fetchGetTimesToAddPrice());
  }, [dispatch]);

  const handleToggle = (payload, value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    selectedPrice(payload);
  };

  //ການ filter ເອົາ ຄ່າ xor ຂອງ 2 arrays ໂດຍການປະຕິເສດຜົນຈາກການຫາ insection ຂອງ 2 arrays
  // const onCheckValidPrice = (stadiumId) => {
  //   const getFilterPrice = getTimesData.filter(
  //     (items1) =>
  //       !priceData.some(
  //         (items2) =>
  //           items1.td_id === items2.td_id && items2.std_id === stadiumId
  //       )
  //   );
  //   if (getFilterPrice.length > 0) {
  //     return getFilterPrice;
  //   }
  //   return getTimesData;
  // };

  return (
    <>
      {priceState.stadiums_id && priceState.stadiums_price ? (
        <div className={classes.formWrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <List className={classes.root}>
                {getTimesData
                  .filter(
                    (items1) =>
                      !priceData.some(
                        (items2) =>
                          items1.td_id === items2.td_id &&
                          items2.std_id === priceState.stadiums_id
                      )
                  )
                  .map((value, index) => {
                    const labelId = `checkbox-list-label-${value.td_id}`;
                    return (
                      <ListItem
                        key={value.td_id}
                        dense
                        button
                        onClick={() => handleToggle(value.td_id, index)}
                      >
                        <ListItemText
                          id={labelId}
                          primary={`${value.td_start} ໂມງ - ${value.td_end} ໂມງ`}
                        />
                        <ListItemSecondaryAction>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              onChange={() => handleToggle(value.td_id, index)}
                              checked={checked.indexOf(index) !== -1}
                              tabIndex={-1}
                              disableRipple
                              disabled={false}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
              </List>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default SelectTimes;
