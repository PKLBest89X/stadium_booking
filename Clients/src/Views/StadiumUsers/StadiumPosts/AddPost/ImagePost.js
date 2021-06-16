import React, { forwardRef } from 'react';

const ImagePost = forwardRef(({ selected, ...rest }, ref) => {
    return <input type="file" onChange={selected} ref={ref} {...rest}/>
});

export default ImagePost;