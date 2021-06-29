import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import Group from "@material-ui/icons/Group";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import Payment from "@material-ui/icons/Payment";
import Assignment from "@material-ui/icons/Assignment";
import Book from "@material-ui/icons/Book";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const sidebarAdminData = [
  {
    title: "ໜ້າຫຼັກ",
    path: `/`,
    icon: <HomeIcon />,
  },
  {
    title: "Post ຂອງເດີ່ນ",
    path: `/stadium-post`,
    icon: <Assignment />,
  },
  {
    title: "ພະນັກງານ",
    path: `/employee-manage`,
    icon: <Group />,
  },
  {
    title: "ເດີ່ນ",
    path: `/manage`,
    icon: <SportsSoccerIcon />,
  },

  {
    title: "ຈອງເດີ່ນ",
    path: `/stadium-booking`,
    icon: <Book />,
  },
  {
    title: "ຊຳລະຄ່າເດີ່ນ",
    path: `/stadium-payment`,
    icon: <Payment />,
  },
  {
    title: "ປະຫວັດການຈອງ",
    path: `/booking-history`,
    icon: <HistoryIcon />,
  },
  {
    title: "ລາຍງານການຊຳລະຄ່າເດີ່ນ",
    path: `/payment-history`,
    icon: <MonetizationOnIcon />,
  },
];
