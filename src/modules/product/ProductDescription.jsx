import React from "react";
import parse from "html-react-parser";

const ProductDescription = ({ item }) => {
  console.log(item);
  return (
    <div>
      {" "}
      <div className="mt-6 rounded-sm ">
        <div>
          <h3 className="text-xl font-normal ">Descriptions</h3>
          {parse(item?.description || "normal")}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
