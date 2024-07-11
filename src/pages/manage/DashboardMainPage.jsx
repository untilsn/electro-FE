import React from "react";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import DashboardPieChart from "../../modules/chart/DashboardPieChart";
import { useSelector } from "react-redux";

const DashboardMainPage = () => {
  const orderItems = useSelector((state) => state.order);
  console.log(orderItems);
  return (
    <div>
      <DashboardHeading>Dashboard page</DashboardHeading>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit neque
        alias maxime perferendis expedita optio quasi iste reprehenderit natus
        sapiente molestiae cum quo officia ipsa deserunt consequuntur, saepe
        nulla aliquam.
      </div>
      <div className="h-[500px] w-[500px]">
        <DashboardPieChart></DashboardPieChart>
      </div>
    </div>
  );
};

export default DashboardMainPage;
