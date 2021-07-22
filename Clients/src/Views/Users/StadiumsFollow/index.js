import React from "react";
import PageLayout from "../../../Components/PageLayout";
import { animated, useSpring, useTransition } from "@react-spring/web";

const StadiumFollow = ({ ...rest }) => {
  const animation = useSpring({
    to: {
      opacity: 1 ,
    },
    from: { opacity: 0 },
  });
  return (
    <PageLayout title="ຕິດຕາມເດີ່ນ" {...rest}>
      <animated.div style={animation}>
        <h1>ເປັນ feed ການຕິດຕາມເດີ່ນທັງໝົດ</h1>
      </animated.div>
    </PageLayout>
  );
};

export default StadiumFollow;
