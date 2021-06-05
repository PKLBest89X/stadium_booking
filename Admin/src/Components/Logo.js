import React from "react";

const Logo = ({...props}) => {
  return (
    <>
      <img alt="Logo" src="/static/images/not_found.png" {...props} />
    </>
  );
};

export default Logo;