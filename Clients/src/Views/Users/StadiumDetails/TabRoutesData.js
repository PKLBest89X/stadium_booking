import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

export const tabRoutesData = [
  {
    title: "ເລື່ອງລາວ",
    pathName: "post",
    icon: <ShoppingBasket />,
  },
  {
    title: "ຂໍ້ມູນເດີ່ນ",
    pathName: "stadium_details",
    icon: <FavoriteIcon />,
  },
  {
    title: "ຈອງເດີ່ນ",
    pathName: "stadium_order",
    icon: <PersonPinIcon />,
  },
];
