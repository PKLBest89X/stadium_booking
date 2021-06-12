import React, { forwardRef } from "react";

const StadiumLogo = forwardRef(({ getFile, ...rest }, ref) => {
  return (
    <>
      <input
        ref={ref}
        margin="normal"
        name="stadium_logo"
        type="file"
        variant="outlined"
        onChange={getFile}
        {...rest}
      />
    </>
  );
});

export default StadiumLogo;
