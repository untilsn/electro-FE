import React, { useState } from "react";
import parse from "html-react-parser";

const ProductDescription = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = item?.description || "Normal description";

  const maxLength = 600;

  const getDisplayDescription = () => {
    if (description.length > maxLength && !isExpanded) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="p-5">
      <div>
        <h3 className="text-xl font-normal mb-5">Mô tả sản phẩm</h3>
        <p>{parse(getDisplayDescription())}</p>
        {description.length > maxLength && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-blue-500 hover:underline"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
