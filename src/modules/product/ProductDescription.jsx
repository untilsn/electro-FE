import React, { useState } from "react";
import parse from "html-react-parser";

const ProductDescription = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = item?.description || "Normal description";

  // Giới hạn số ký tự hiển thị trước khi nhấn "Xem thêm"
  const maxLength = 600;

  // Hàm để hiển thị mô tả rút gọn hoặc đầy đủ
  const getDisplayDescription = () => {
    if (description.length > maxLength && !isExpanded) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="mt-6 rounded-sm">
      <div>
        <h3 className="text-xl font-normal">Descriptions</h3>
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
