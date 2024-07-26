import React from "react";

const ChartBox = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-lg">
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-xl font-medium text-darkPrimary">{item.value}</div>
      </div>
      <div
        className={`w-8 h-8 bg-${item.color}-500 rounded-full flex items-center justify-center text-white`}
      >
        {item.icon}
      </div>
    </div>
  );
};

export default ChartBox;
