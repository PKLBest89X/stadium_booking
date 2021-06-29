import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Book from "@material-ui/icons/Book";

export const sidebarUserData = [
  {
    title: "ໜ້າຫຼັກ",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "ຈອງເດີ່ນ",
    path: "/stadium",
    icon: <Book />,
  },
  {
    title: "ປະຫວັດການຈອງ",
    path: "/booking-history",
    icon: <HistoryIcon />,
  },
  {
    title: "ຕິດຕາມເດີ່ນ",
    path: "/stadium-follow",
    icon: <AccountBalanceWalletIcon />,
  },
];

