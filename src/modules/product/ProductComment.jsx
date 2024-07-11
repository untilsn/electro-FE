import React from "react";

const ProductComment = (props) => {
  const { href, width } = props;
  return (
    <div
      className="fb-comments"
      data-href={href}
      data-numposts="5"
      data-width={width}
    ></div>
  );
};

export default ProductComment;
