import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  img: {
    display: "block",
    width: "100%",
    height: "calc(100vw / 3 - 1px)",
    objectFit: "cover",
  },
}));
const ListStadiumItems = ({ items }) => {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <img className={classes.img} src={`/assets/images/adminPics/stadiumDetailsPics/${items.picture}`} alt={items.std_name} />
      </Paper>
    </div>
  );
};

export default ListStadiumItems;
