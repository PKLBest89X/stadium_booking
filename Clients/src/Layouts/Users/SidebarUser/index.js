import React from "react";
import Backdrop from "../../Backdrop";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { onSmDownClose } from "../../../Slices/Features/ToggleDrawer/toggleSlice";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import HeaderUser from "./HeaderUser";
import ListUser from "./ListUser";
import { Drawer, Divider, Hidden } from "@material-ui/core";

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  //ການ set ໃຫ້ appbar ທາງເທິງ

  //ການໃສ່ style ໃຫ້ drawer ບໍ່ໃຫ້ມີ scroll bar ແລະ set ຄວາມາສູງໃຫ້ເທົ່າ 100%

  drawerPaper: {
    overflowX: "hidden",
    overflowY: "hidden",
    height: "100%",
    // transition: '400ms ease-in-out',
    [theme.breakpoints.up("lg")]: {
      zIndex: 4,
      width: drawerWidth,
    },
    [theme.breakpoints.between("md", "md")]: {
      zIndex: 4,
      width: 64,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: 250,
    },
    whiteSpace: "noWrap",
  },

  main_container: {
    height: "calc(100%)",
    display: "flex",
    flexDirection: "column",
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    width: 64,
  },

}));

const SidebarUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { smUp, smDown } = useShallowEqualSelector((state) => state.toggle);

  // ພາກສ່ວນຂອງ sidebar
  const list = () => (
    <div className={classes.main_container} role="presentation">
      <HeaderUser />

      <Divider />
      <ListUser />
    </div>
  );

  return (
    <div className={classes.grow}>
      <div>
        {smDown && <Backdrop />}
        <Hidden mdUp implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="persistent"
            anchor="left"
            open={smDown}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            onClose={(event) => {
              if (
                event.type === "keydown" &&
                (event.key === "Tab" || event.key === "Shift")
              ) {
                return;
              }
              dispatch(onSmDownClose());
            }}
          >
            {list()}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={clsx(classes.main_container, {
              [classes.drawerOpen]: smUp,
              [classes.drawerClose]: !smUp,
            })}
            classes={{
              paper: clsx(classes.drawerPaper, {
                [classes.drawerOpen]: smUp,
                [classes.drawerClose]: !smUp,
              }),
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            variant="permanent"
          >
            {list()}
          </Drawer>
        </Hidden>
      </div>
    </div>
  );
};

export default SidebarUser;
