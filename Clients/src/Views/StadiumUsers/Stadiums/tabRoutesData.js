import Sports from "@material-ui/icons/Sports";
import LocalOffer from "@material-ui/icons/LocalOffer";
import LocalDrink from "@material-ui/icons/LocalDrink";
import Home from "@material-ui/icons/Home";

export const tabRoutesData = [
  {
    title: "ໜ້າຫຼັກ",
    path: ``,
    icon: <Home />,
  },
  {
    title: "ສະໜາມ",
    path: `/stadium-details`,
    icon: <Sports />,
  },
  {
    title: "ລາຄາເດີ່ນ",
    path: `/stadium-price`,
    icon: <LocalOffer />,
  },
  {
    title: "ເຄື່ອງດື່ມ",
    path: `/stadium-drink`,
    icon: <LocalDrink />,
  },
];
