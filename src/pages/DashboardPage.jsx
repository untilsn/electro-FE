import React from "react";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./manage/DashboardLayout";

const DashboardPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user?.isAdmin !== true) {
  //     toast.warning("you dont have right to manage page");
  //     navigate("/"); // Navigate to home page
  //   }

  //   return;
  // }, [user]);
  return (
    <div className="bg-[#F8F9FA]">
      <div className="border-t border-gray border-opacity-10">
        <div className="grid grid-cols-[300px_minmax(0,_1fr)] ">
          <DashboardSidebar></DashboardSidebar>
          <DashboardLayout>
            <Outlet></Outlet>
          </DashboardLayout>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
