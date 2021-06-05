import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import ClosedCaption from "@material-ui/icons/ClosedCaption";

export const sidebarUserData = [
  {
    title: "ໜ້າຫຼັກ",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "ເດີ່ນ",
    path: "/ເດີ່ນ",
    icon: <SportsSoccerIcon />,
  },
  {
    title: "ປະຫວັດການຈອງ",
    path: "/ປະຫວັດການຈອງ",
    icon: <HistoryIcon />,
  },
  {
    title: "ຕິດຕາມເດີ່ນ",
    path: "/ຕິດຕາມເດີ່ນ",
    icon: <AccountBalanceWalletIcon />,
  },
];

export const sidebarUserData2 = [
  {
    title: "ຮຽນ useEffect",
    path: "/reactuseeffect",
    icon: <ClosedCaption />,
  },
];
