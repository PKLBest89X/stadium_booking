import React, { forwardRef } from "react";
import { Button } from "@material-ui/core";

const EditPicture = forwardRef(({ selected, ...rest }, ref) => {
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        id="contained-button-file2"
        onChange={selected}
        ref={ref}
        {...rest}
      />
      <label htmlFor="contained-button-file2">
        <Button variant="contained" color="primary" component="span">
          ເລືອກຮູບພື້ນຫຼັງເດີ່ນ
        </Button>
      </label>
    </>
  );
});

export default EditPicture;
