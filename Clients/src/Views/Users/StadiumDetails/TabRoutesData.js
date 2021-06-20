import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

export const tabRoutesData = [
  {
    title: "ໜ້າຫຼັກ",
    path: "",
    icon: <ShoppingBasket />,
  },
  {
    title: "Post ຂອງເດີ່ນ",
    path: "/posts",
    icon: <ShoppingBasket />,
  },
  {
    title: "ກ່ຽວກັບເດີ່ນ",
    path: "/information",
    icon: <FavoriteIcon />,
  },
  {
    title: "ຈອງເດີ່ນ",
    path: "/stadium-booking",
    icon: <PersonPinIcon />,
  },
];
