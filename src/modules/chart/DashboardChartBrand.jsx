import React, { useState } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

const DashboardChartBrand = () => {
  const [data] = useState([
    { name: "Apple", totalProducts: 10 },
    { name: "Samsung", totalProducts: 2 },
    { name: "Xiaomi", totalProducts: 1 },
    { name: "Oppo", totalProducts: 6 },
    { name: "Huawei", totalProducts: 8 },
    { name: "Vivo", totalProducts: 9 },
    { name: "Sony", totalProducts: 12 },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (data, index) => {
    setActiveIndex(index);
  };

  const activeItem = data[activeIndex];

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <h1 className="text-lg capitalize text-darkPrimary">
          Thống kê sản phẩm điện thoại
        </h1>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="totalProducts" onClick={handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-5 text-xl font-medium content">{`Total products for "${activeItem?.name}": ${activeItem?.totalProducts}`}</p>
    </div>
  );
};

export default DashboardChartBrand;
