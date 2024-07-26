import React from "react";
import DashboardPieChart from "../../modules/chart/DashboardPieChart";
import ChartBox from "../../components/chart/ChartBox";
import { MdOutlineMoney } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import DashboardChartBrand from "../../modules/chart/DashboardChartBrand";

const chartList = [
  {
    id: 1,
    title: "Tổng lợi nhuận",
    value: "210.000.000đ",
    icon: <MdOutlineMoney />,
    color: "red",
  },
  {
    id: 2,
    title: "Tổng đơn hàng",
    value: "20",
    icon: <FaProductHunt />,
    color: "green",
  },
  {
    id: 3,
    title: "Sản phẩm",
    value: "36",
    icon: <AiFillProduct />,
    color: "purple",
  },
  {
    id: 4,
    title: "Người dùng",
    value: "8",
    icon: <FaUsersLine />,
    color: "blue",
  },
];

const DashboardManage = () => {
  return (
    <div>
      <div className="grid w-full grid-cols-4 gap-5">
        {chartList.map((item) => (
          <ChartBox key={item.id} item={item}></ChartBox>
        ))}
      </div>
      <div className="grid grid-cols-[60%_40%] gap-5 items-end mt-20 ">
        <div className="p-5 rounded bg-white h-[400px]">
          <DashboardChartBrand></DashboardChartBrand>
        </div>
        <div className="p-5 rounded bg-white h-[400px]">
          <DashboardPieChart></DashboardPieChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardManage;
