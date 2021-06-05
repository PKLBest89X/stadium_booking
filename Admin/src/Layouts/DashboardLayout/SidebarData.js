import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import Group from "@material-ui/icons/Group";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const SidebarData = [
  {
    title: "ໜ້າຫຼັກ",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "ເຈົ້າຂອງເດີ່ນ",
    path: "/stadium_owner",
    icon: <Group />,
  },
  {
    title: "ເດີ່ນທັງໝົດ",
    path: "/all_stadiums",
    icon: <SportsSoccerIcon />,
  },
  {
    title: "ບັນຊີຂອງຂ້ອຍ",
    path: "account",
    icon: <AccountCircle />,
  },
];

export const user = {
  avatar: "/assets/images/admin_img/neymar.jpg",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
};
