import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import Group from "@material-ui/icons/Group";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import LocalOffer from "@material-ui/icons/LocalOffer";
import LocalDrink from "@material-ui/icons/LocalDrink";
import Payment from "@material-ui/icons/Payment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Book from "@material-ui/icons/Book";

export const sidebarAdminData = [
  {
    title: "ໜ້າຫຼັກ",
    path: `/admin`,
    icon: <HomeIcon />,
  },
  {
    title: "ພະນັກງານ",
    path: `/admin/employee_manage`,
    icon: <Group />,
  },
  {
    title: "ເດີ່ນ",
    path: `/admin/stadium`,
    icon: <SportsSoccerIcon />,
  },
  {
    title: "ລາຄາເດີ່ນ",
    path: `/admin/stadium_price`,
    icon: <LocalOffer />,
  },
  {
    title: "ເຄື່ອງດື່ມ",
    path: `/admin/drink`,
    icon: <LocalDrink />,
  },
  {
    title: "ຈອງເດີ່ນ",
    path: `/admin/booking`,
    icon: <Book />,
  },
  {
    title: "ຊຳລະຄ່າເດີ່ນ",
    path: `/admin/payment`,
    icon: <Payment />,
  },
  {
    title: "ບັນຊີຂອງຂ້ອຍ",
    path: `/admin/account`,
    icon: <AccountCircle />,
  },
];

export const user = {
  avatar: "/assets/images/admin_img/neymar.jpg",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
};
