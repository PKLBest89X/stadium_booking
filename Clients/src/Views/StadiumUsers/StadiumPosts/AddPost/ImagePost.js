import React, { forwardRef } from "react";
import { Button } from "@material-ui/core";

const ImagePost = forwardRef(({ selected, ...rest }, ref) => {
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        id="contained-button-file"
        onChange={selected}
        ref={ref}
        {...rest}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          ເລືອກຮູບພາບ
        </Button>
      </label>
    </>
  );
});

export default ImagePost;
