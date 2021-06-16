import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  img: {
    display: "block",
    width: "100%",
    height: "100%",
  },
}));
const ListStadiumItems = ({ items }) => {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <img className={classes.img} src={items.imgPath} alt={items.label} />
      </Paper>
    </div>
  );
};

export default ListStadiumItems;
