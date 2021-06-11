import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  aboutContainer: {
    padding: "1em",
    "& > div": {
      display: "block",
      "& > :first-child": {
        paddingBottom: "1em",
      },
      "& > :last-child": {
        paddingTop: "1em",
      },
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.aboutContainer}>
      <div className={classes.aboutContent}>
        <p>
          <span>ໂຄງການບົດຈົບຊັ້ນໂດຍ</span>
        </p>
        <p>
          <span>ທ້າວ. ພູມມີໄຊ ຂຸນທິກຸມມານ</span>
        </p>
        <p>
          <span>ທ້າວ. ເກດສະດາພອນ ວິຍະວົງ</span>
        </p>
        <p>
          <span>ສົກຮຽນ 2020 - 2021</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
