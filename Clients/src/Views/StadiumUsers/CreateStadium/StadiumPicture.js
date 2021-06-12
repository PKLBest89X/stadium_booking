import React, { forwardRef } from "react";

const StadiumPicture = forwardRef(({ getFile, ...rest }, ref) => {
  return (
    <>
      <input
        ref={ref}
        margin="normal"
        name="stadium_picture"
        type="file"
        variant="outlined"
        onChange={getFile}
        {...rest}
      />
    </>
  );
});

export default StadiumPicture;
